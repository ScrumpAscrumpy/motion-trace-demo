(() => {
  const video = document.getElementById('video');
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('overlay');
  const ctx = canvas.getContext('2d');
  const fileInput = document.getElementById('videoInput');
  const seedButton = document.getElementById('seedMode');
  const correctButton = document.getElementById('correctMode');
  const runButton = document.getElementById('trackButton');
  const select = document.getElementById('trackSelect');
  const status = document.getElementById('status');
  const MAX_SAMPLES = 120;
  const SEARCH_RADIUS = 12;
  const PATCH_RADIUS = 4;
  const tracks = [];
  let objectUrl = null;
  let mode = '';
  let procWidth = 0;
  let procHeight = 0;
  let imageScale = 1;
  let plan = null;
  let processing = false;

  const setStatus = (message, error = false) => {
    status.textContent = message;
    status.classList.toggle('error', error);
  };
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const idLabel = (index) => `P-${String(index + 1).padStart(2, '0')}`;

  function makePlan() {
    const duration = video.duration;
    const requested = clamp(Number(document.getElementById('intervalInput').value) || 0.25, 0.05, 5);
    const intervals = Math.max(1, Math.min(MAX_SAMPLES - 1, Math.ceil(duration / requested)));
    const step = duration / intervals;
    return { duration, intervals, step, count: intervals + 1 };
  }

  function nearestFrame(timeSec) {
    if (!plan) return 0;
    return clamp(Math.round(timeSec / plan.step), 0, plan.intervals);
  }

  function updateSelection() {
    const current = select.value;
    select.innerHTML = '';
    if (!tracks.length) {
      select.add(new Option('No tracks', ''));
      select.disabled = true;
      return;
    }
    tracks.forEach((track) => select.add(new Option(track.id, track.id)));
    select.disabled = false;
    select.value = tracks.some((track) => track.id === current) ? current : tracks[tracks.length - 1].id;
  }

  function setMode(next) {
    mode = mode === next ? '' : next;
    seedButton.setAttribute('aria-pressed', String(mode === 'seed'));
    correctButton.setAttribute('aria-pressed', String(mode === 'correct'));
    canvas.classList.toggle('is-interactive', Boolean(mode));
    if (mode === 'seed') setStatus('Click the video to add a point seed. You can place several objects.');
    else if (mode === 'correct') setStatus('Select a track, then click its corrected position on the current frame.');
    else setStatus('Annotation mode off.');
  }

  function resizeOverlay() {
    if (!video.videoWidth) return;
    procWidth = Math.min(640, video.videoWidth);
    procHeight = Math.round(video.videoHeight * procWidth / video.videoWidth);
    imageScale = video.videoWidth / procWidth;
    canvas.width = procWidth;
    canvas.height = procHeight;
    stage.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
    render();
  }

  function sampleAtVideoTime(track, timeSec) {
    if (!track.points.length) return timeSec + 0.01 >= track.seed.timeSec ? { ...track.seed, method: 'seed' } : null;
    if (!plan) return null;
    const index = nearestFrame(timeSec);
    for (let i = index; i >= 0; i -= 1) {
      const point = track.points[i];
      if (point) return point;
    }
    return null;
  }

  function render() {
    if (!ctx || !canvas.width || !canvas.height) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const frame = video.duration && plan ? nearestFrame(video.currentTime || 0) : 0;
    tracks.forEach((track) => {
      let previous = null;
      ctx.beginPath();
      track.points.forEach((point, index) => {
        if (!point || index > frame) { previous = null; return; }
        if (!previous || index !== previous.index + 1) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
        previous = { ...point, index };
      });
      ctx.strokeStyle = track.id === select.value ? '#f2b36d' : 'rgba(84, 215, 161, .77)';
      ctx.lineWidth = track.id === select.value ? 2.4 : 1.6;
      ctx.stroke();
      const current = sampleAtVideoTime(track, video.currentTime || 0);
      if (current) {
        ctx.beginPath();
        ctx.arc(current.x, current.y, track.id === select.value ? 6 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = track.id === select.value ? '#f2b36d' : '#54d7a1';
        ctx.fill();
        ctx.font = '11px ui-monospace, monospace';
        ctx.fillStyle = '#f7f8f5';
        ctx.shadowColor = 'rgba(0,0,0,.75)';
        ctx.shadowBlur = 4;
        ctx.fillText(track.id, current.x + 9, current.y - 8);
        ctx.shadowBlur = 0;
      }
    });
    document.getElementById('frameMeta').textContent = video.duration && plan
      ? `${(video.currentTime || 0).toFixed(2)} s · ${plan.count} sampled frames · ${tracks.length} tracks`
      : '—';
  }

  function mapClick(event) {
    if (!mode || processing || !procWidth) return;
    const rect = canvas.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width * procWidth, 0, procWidth - 1);
    const y = clamp((event.clientY - rect.top) / rect.height * procHeight, 0, procHeight - 1);
    const timeSec = video.currentTime || 0;
    const index = plan ? nearestFrame(timeSec) : 0;
    if (mode === 'seed') {
      const track = {
        id: idLabel(tracks.length),
        seed: { timeSec, x, y },
        corrections: [],
        points: [],
        lostAt: null,
      };
      tracks.push(track);
      updateSelection();
      correctButton.disabled = false;
      runButton.disabled = false;
      setStatus(`${track.id} seeded at ${timeSec.toFixed(2)} s. Add more seeds or extend tracks.`);
    } else if (mode === 'correct') {
      const track = tracks.find((item) => item.id === select.value);
      if (!track) return setStatus('Select a track before correcting a point.', true);
      const correction = { timeSec, x, y };
      if (plan && nearestFrame(track.seed.timeSec) === index) {
        track.seed = correction;
      } else {
        track.corrections = track.corrections.filter((item) => Math.abs(item.timeSec - timeSec) > (plan?.step || 0.1) * 0.45);
        track.corrections.push(correction);
        track.corrections.sort((a, b) => a.timeSec - b.timeSec);
      }
      if (track.points[index]) track.points[index] = { ...track.points[index], x, y, score: 1, method: 'manual' };
      render();
      setStatus(`Correction saved for ${track.id} at ${(index * (plan?.step || 0)).toFixed(2)} s. Run tracking again to extend from it.`);
    }
    render();
  }

  function waitForSeek(time) {
    return new Promise((resolve, reject) => {
      if (Math.abs(video.currentTime - time) < 0.012) return resolve();
      const onSeeked = () => { cleanup(); resolve(); };
      const onError = () => { cleanup(); reject(new Error('Could not decode a video frame.')); };
      const cleanup = () => {
        video.removeEventListener('seeked', onSeeked);
        video.removeEventListener('error', onError);
      };
      video.addEventListener('seeked', onSeeked, { once: true });
      video.addEventListener('error', onError, { once: true });
      video.currentTime = time;
    });
  }

  async function getGrayFrame(time) {
    await waitForSeek(time);
    ctx.drawImage(video, 0, 0, procWidth, procHeight);
    const pixels = ctx.getImageData(0, 0, procWidth, procHeight).data;
    const gray = new Uint8Array(procWidth * procHeight);
    for (let i = 0, j = 0; i < pixels.length; i += 4, j += 1) {
      gray[j] = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) | 0;
    }
    return gray;
  }

  function matchPatch(previous, next, x, y) {
    const radius = PATCH_RADIUS;
    const search = SEARCH_RADIUS;
    const width = procWidth;
    if (x < radius + search || y < radius + search || x >= width - radius - search || y >= procHeight - radius - search) return { x, y, score: -1 };
    const patch = [];
    let sumA = 0;
    let sumA2 = 0;
    for (let dy = -radius; dy <= radius; dy += 1) {
      for (let dx = -radius; dx <= radius; dx += 1) {
        const value = previous[(y + dy) * width + x + dx];
        patch.push(value);
        sumA += value;
        sumA2 += value * value;
      }
    }
    const n = patch.length;
    const varianceA = sumA2 - sumA * sumA / n;
    if (varianceA < 35) return { x, y, score: -1 };
    let best = { x, y, score: -1 };
    for (let oy = -search; oy <= search; oy += 1) {
      for (let ox = -search; ox <= search; ox += 1) {
        const cx = x + ox;
        const cy = y + oy;
        let sumB = 0;
        let sumB2 = 0;
        let sumAB = 0;
        let k = 0;
        for (let dy = -radius; dy <= radius; dy += 1) {
          const offset = (cy + dy) * width + cx;
          for (let dx = -radius; dx <= radius; dx += 1) {
            const value = next[offset + dx];
            sumB += value;
            sumB2 += value * value;
            sumAB += patch[k] * value;
            k += 1;
          }
        }
        const varianceB = sumB2 - sumB * sumB / n;
        if (varianceB < 35) continue;
        const covariance = sumAB - sumA * sumB / n;
        const score = covariance / Math.sqrt(varianceA * varianceB);
        if (score > best.score) best = { x: cx, y: cy, score };
      }
    }
    return best;
  }

  async function trackForward() {
    if (processing || !video.videoWidth || !tracks.length) return;
    processing = true;
    runButton.disabled = true;
    seedButton.disabled = true;
    correctButton.disabled = true;
    document.getElementById('resetButton').disabled = true;
    mode = '';
    canvas.classList.remove('is-interactive');
    try {
      plan = makePlan();
      if (plan.count > MAX_SAMPLES) throw new Error('Clip sampling limit exceeded.');
      const returnTime = video.currentTime || 0;
      video.pause();
      const frames = [];
      for (let i = 0; i < plan.count; i += 1) {
        const t = Math.min(plan.duration, i * plan.step);
        frames.push(await getGrayFrame(t));
        setStatus(`Reading frames ${i + 1}/${plan.count} · ${(t).toFixed(2)} s`);
        if (i % 3 === 2) await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      for (const track of tracks) {
        track.points = Array(plan.count).fill(null);
        track.lostAt = null;
        const start = nearestFrame(track.seed.timeSec);
        let x = track.seed.x;
        let y = track.seed.y;
        let lost = false;
        const correctionMap = new Map(track.corrections.map((item) => [nearestFrame(item.timeSec), item]));
        if (correctionMap.has(start)) {
          x = correctionMap.get(start).x;
          y = correctionMap.get(start).y;
        }
        track.points[start] = { x, y, score: 1, method: correctionMap.has(start) ? 'manual' : 'seed' };
        for (let i = start; i < plan.intervals; i += 1) {
          const correction = correctionMap.get(i + 1);
          if (correction) {
            x = correction.x;
            y = correction.y;
            lost = false;
            track.points[i + 1] = { x, y, score: 1, method: 'manual' };
            continue;
          }
          if (lost) continue;
          const match = matchPatch(frames[i], frames[i + 1], Math.round(x), Math.round(y));
          if (match.score < 0.52) {
            track.lostAt = { frame: i + 1, score: Math.max(0, match.score) };
            lost = true;
            continue;
          }
          x = match.x;
          y = match.y;
          track.points[i + 1] = { x, y, score: match.score, method: 'template-match' };
        }
      }
      await waitForSeek(returnTime);
      updateResults();
      const nPoints = tracks.reduce((sum, track) => sum + track.points.filter(Boolean).length, 0);
      const lostTracks = tracks.filter((track) => track.lostAt).length;
      setStatus(`Done · ${nPoints} point annotations across ${tracks.length} tracks${lostTracks ? ` · ${lostTracks} track(s) stopped at low match confidence; review or correct` : ''}.`);
    } catch (error) {
      setStatus(error.message || 'Tracking failed. Try a shorter clip or another browser-supported video.', true);
    } finally {
      processing = false;
      seedButton.disabled = false;
      correctButton.disabled = tracks.length === 0;
      runButton.disabled = tracks.length === 0;
      document.getElementById('resetButton').disabled = false;
      render();
    }
  }

  function updateResults() {
    const count = tracks.reduce((sum, track) => sum + track.points.filter(Boolean).length, 0);
    const expected = plan ? tracks.reduce((sum, track) => sum + plan.count - nearestFrame(track.seed.timeSec), 0) : 0;
    document.getElementById('resultMeta').textContent = `${count} points · ${tracks.length} tracks · review before use`;
    document.getElementById('csvButton').disabled = count === 0;
    document.getElementById('jsonButton').disabled = count === 0;
    document.getElementById('frameMeta').textContent = plan
      ? `${(video.currentTime || 0).toFixed(2)} s · ${plan.count} sampled frames · ${count}/${expected} points`
      : '—';
  }

  function download(name, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportCSV() {
    const rows = ['track_id,frame,time_sec,x_px,y_px,confidence,method'];
    tracks.forEach((track) => track.points.forEach((point, frame) => {
      if (!point) return;
      rows.push([track.id, frame, (frame * plan.step).toFixed(4), (point.x * imageScale).toFixed(2), (point.y * imageScale).toFixed(2), point.score.toFixed(4), point.method].join(','));
    }));
    download('motion-tracks.csv', rows.join('\n'), 'text/csv;charset=utf-8');
  }

  function exportJSON() {
    const data = {
      schema: 'motion-trace.points.v1',
      annotationType: 'point trajectories',
      reviewRequired: true,
      videoDimensions: { width: video.videoWidth, height: video.videoHeight },
      sampleIntervalSec: plan?.step ?? null,
      tracks: tracks.map((track) => ({
        id: track.id,
        seedTimeSec: track.seed.timeSec,
        points: track.points.flatMap((point, frame) => point ? [{ frame, timeSec: Number((frame * plan.step).toFixed(4)), xPx: Number((point.x * imageScale).toFixed(2)), yPx: Number((point.y * imageScale).toFixed(2)), confidence: Number(point.score.toFixed(4)), method: point.method }] : []),
        stoppedAt: track.lostAt ? { frame: track.lostAt.frame, confidence: Number(track.lostAt.score.toFixed(4)) } : null,
      })),
    };
    download('motion-tracks.json', JSON.stringify(data, null, 2), 'application/json');
  }

  function clearSession() {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = null;
    video.pause();
    video.removeAttribute('src');
    video.load();
    video.hidden = true;
    fileInput.value = '';
    tracks.splice(0, tracks.length);
    plan = null;
    mode = '';
    canvas.width = 0;
    canvas.height = 0;
    canvas.classList.remove('is-interactive');
    stage.style.aspectRatio = '16 / 9';
    document.getElementById('emptyState').hidden = false;
    document.getElementById('videoMeta').textContent = 'NO VIDEO';
    document.getElementById('frameMeta').textContent = '—';
    document.getElementById('resultMeta').textContent = 'CSV or JSON · no data yet';
    seedButton.disabled = true;
    correctButton.disabled = true;
    runButton.disabled = true;
    document.getElementById('csvButton').disabled = true;
    document.getElementById('jsonButton').disabled = true;
    document.getElementById('resetButton').disabled = true;
    updateSelection();
    setStatus('Choose a browser-supported video format. AVI playback depends on the browser codec; convert to H.264 MP4 or WebM if it will not open.');
  }

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    clearSession();
    objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;
    video.hidden = false;
    video.onloadedmetadata = () => {
      resizeOverlay();
      document.getElementById('emptyState').hidden = true;
      document.getElementById('videoMeta').textContent = `${video.videoWidth} × ${video.videoHeight} · ${video.duration.toFixed(1)} s`;
      seedButton.disabled = false;
      correctButton.disabled = tracks.length === 0;
      document.getElementById('resetButton').disabled = false;
      setStatus('Pause on a frame and place point seeds. For best results, use a short clip with clear object texture.');
    };
    video.onerror = () => setStatus('This browser could not decode the video. Try H.264 MP4 or WebM; AVI support varies by browser.', true);
    event.target.value = '';
  });

  seedButton.addEventListener('click', () => setMode('seed'));
  correctButton.addEventListener('click', () => setMode('correct'));
  runButton.addEventListener('click', trackForward);
  canvas.addEventListener('click', mapClick);
  video.addEventListener('timeupdate', render);
  video.addEventListener('seeked', render);
  video.addEventListener('play', () => { mode = ''; canvas.classList.remove('is-interactive'); seedButton.setAttribute('aria-pressed', 'false'); correctButton.setAttribute('aria-pressed', 'false'); });
  select.addEventListener('change', render);
  document.getElementById('resetButton').addEventListener('click', clearSession);
  document.getElementById('csvButton').addEventListener('click', exportCSV);
  document.getElementById('jsonButton').addEventListener('click', exportJSON);
  window.addEventListener('resize', resizeOverlay);
})();
