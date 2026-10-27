(() => {
  const messages = {
    en: {
      localProcessing: 'LOCAL PROCESSING', languageLabel: 'Language', workspaceLabel: 'Video motion annotation workspace', videoFrameLabel: 'Video frame with motion traces', homeLabel: 'Motion Trace home', eyebrow: 'VIDEO → TRACK DATA', heroLine1: 'Trace motion.', heroLine2: 'Keep the evidence.',
      openVideo: 'Open a video', clearSession: 'Clear session', emptyTitle: 'Open a local video to begin', emptyNote: 'Video stays in this browser session.', noVideo: 'NO VIDEO',
      seedHeading: 'Seed points', seedHelp: 'Pause on a frame, then place one point on each object to follow. A seed is a starting location, not automatic detection.',
      placePoints: '＋ Place points', correctSelected: 'Correct selected', selectedTrack: 'Selected track', noTracks: 'No tracks',
      extendHeading: 'Extend tracks', extendHelp: 'Local image matching follows each seed between sampled frames; it can stop if the match is uncertain.',
      sampleInterval: 'Sample interval', seconds: 'seconds', intervalHelp: 'Target time gap between samples. Smaller gaps capture faster motion but take longer.', trackForward: 'Track forward',
      exportHeading: 'Export annotations', noDataYet: 'CSV or JSON · no data yet', downloadCsv: 'Download CSV', downloadJson: 'Download JSON',
      formatHelp: 'Choose a browser-supported video format. AVI playback depends on the browser codec; convert to H.264 MP4 or WebM if it will not open.',
      qualityNote: 'Point tracks are draft annotations. Review and correct them before training; this demo does not create object masks or certify ground truth.',
      footerTitle: 'MOTION TRACE · BROWSER DEMO', footerPrivacy: 'No account · No upload',
      annotationOff: 'Annotation mode off.', clickToSeed: 'Click the video to add a point seed. You can place several objects.', clickToCorrect: 'Select a track, then click its corrected position on the current frame.',
      pauseFirst: 'Pause the video before placing or correcting a point.', seeded: '{id} seeded at {time} s. Add more seeds or extend tracks.', selectBeforeCorrect: 'Select a track before correcting a point.',
      corrected: 'Correction saved for {id} at {time} s. Run tracking again to extend from it.', decodeError: 'Could not decode a video frame.',
      clipLimit: 'Clip sampling limit reached. Increase the sample interval or use a shorter video.', reading: 'Reading frames {current}/{total} · {time} s',
      done: 'Done · {points} point annotations across {tracks} tracks{warning}.', lowConfidence: ' · {count} track(s) stopped at low match confidence; review or correct',
      trackFailed: 'Tracking failed. Try a shorter clip or another browser-supported video.', resultCount: '{points} points · {tracks} tracks · review before use',
      frameCount: '{time} s · {count} sampled frames · {tracks} tracks · {actual} s actual interval', frameResults: '{time} s · {frames} sampled frames · {points}/{expected} points · {actual} s actual interval',
      noData: 'No point annotations to export. Run tracking first.', noPlan: 'Sampling settings are unavailable. Reload the video and try again.',
      intervalChanged: 'Sample interval changed. Run tracking again before exporting.',
      videoMeta: '{width} × {height} · {duration} s', pausePrompt: 'Pause on a frame and place point seeds. For best results, use a short clip with clear object texture.',
      videoError: 'This browser could not decode the video. Try H.264 MP4 or WebM; AVI support varies by browser.'
    },
    zh: {
      localProcessing: '本地处理', languageLabel: '语言', workspaceLabel: '视频运动标注工作区', videoFrameLabel: '带有运动轨迹的视频画面', homeLabel: 'Motion Trace 首页', eyebrow: '视频 → 轨迹数据', heroLine1: '追踪运动。', heroLine2: '保留数据依据。',
      openVideo: '打开视频', clearSession: '清除本次数据', emptyTitle: '打开本地视频以开始', emptyNote: '视频仅在当前浏览器会话中处理。', noVideo: '未载入视频',
      seedHeading: '放置起始点', seedHelp: '暂停在目标画面，在每个待跟踪对象上点一下。起始点只表示位置，不会自动检测对象。',
      placePoints: '＋ 放置点', correctSelected: '修正选中轨迹', selectedTrack: '当前轨迹', noTracks: '暂无轨迹',
      extendHeading: '延伸轨迹', extendHelp: '程序在采样帧之间进行局部图像匹配；匹配不确定时会停止该轨迹。',
      sampleInterval: '采样间隔', seconds: '秒', intervalHelp: '相邻采样帧的目标时间间隔。间隔越小，越不易漏过快速运动，但处理时间更长。', trackForward: '向后追踪',
      exportHeading: '导出标注', noDataYet: 'CSV 或 JSON · 暂无数据', downloadCsv: '下载 CSV', downloadJson: '下载 JSON',
      formatHelp: '请选择浏览器支持的视频格式。AVI 是否可播放取决于浏览器解码器；无法打开时可转换为 H.264 MP4 或 WebM。',
      qualityNote: '点轨迹是待复核的草稿标注。用于训练前请检查并修正；本演示不生成对象掩膜，也不保证标注为真实值。',
      footerTitle: 'MOTION TRACE · 浏览器演示', footerPrivacy: '无需账户 · 不上传视频',
      annotationOff: '标注模式已关闭。', clickToSeed: '点击视频画面添加起始点；可以放置多个对象。', clickToCorrect: '选择一条轨迹，再点击当前画面中的正确位置。',
      pauseFirst: '请先暂停视频，再放置或修正点。', seeded: '已在 {time} 秒为 {id} 放置起始点。可继续添加，或开始延伸轨迹。', selectBeforeCorrect: '请先选择一条轨迹再修正。',
      corrected: '已修正 {id} 在 {time} 秒处的位置。重新运行追踪可从此处继续。', decodeError: '无法解码视频帧。',
      clipLimit: '达到视频采样上限。请增大采样间隔或使用更短的视频。', reading: '正在读取帧 {current}/{total} · {time} 秒',
      done: '完成 · {tracks} 条轨迹，共 {points} 个点标注{warning}。', lowConfidence: ' · {count} 条轨迹因匹配置信度低而停止，请检查或修正',
      trackFailed: '追踪失败。请尝试更短的视频，或使用浏览器支持的其他格式。', resultCount: '{tracks} 条轨迹 · {points} 个点 · 使用前请复核',
      frameCount: '{time} 秒 · {count} 个采样帧 · {tracks} 条轨迹 · 实际间隔 {actual} 秒', frameResults: '{time} 秒 · {frames} 个采样帧 · {points}/{expected} 个点 · 实际间隔 {actual} 秒',
      noData: '没有可导出的点标注。请先运行追踪。', noPlan: '无法读取采样设置。请重新载入视频后重试。',
      intervalChanged: '采样间隔已更改。请重新运行追踪后再导出。',
      videoMeta: '{width} × {height} · {duration} 秒', pausePrompt: '暂停在目标画面并放置起始点。短视频、清晰且有纹理的对象通常更容易追踪。',
      videoError: '浏览器无法解码此视频。请尝试 H.264 MP4 或 WebM；不同浏览器对 AVI 的支持不同。'
    }
  };
  let locale = 'en';
  try { locale = localStorage.getItem('motionTraceLocale') === 'zh' ? 'zh' : 'en'; } catch {}
  const t = (key, values = {}) => {
    if (key === 'done' && values.lostCount !== undefined) {
      values = { ...values, warning: values.lostCount ? t('lowConfidence', { count: values.lostCount }) : '' };
    }
    let message = messages[locale][key] || messages.en[key] || key;
    Object.entries(values).forEach(([name, value]) => { message = message.replaceAll(`{${name}}`, String(value)); });
    return message;
  };
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
    else console.warn(`Motion Trace: expected page element #${id} is missing.`);
  };
  const video = document.getElementById('video');
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('overlay');
  const ctx = canvas?.getContext('2d');
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
  let statusKey = 'formatHelp';
  let statusValues = {};
  let statusRaw = null;
  let statusError = false;

  const setStatus = (keyOrMessage, values = {}, error = false) => {
    if (typeof values === 'boolean') { error = values; values = {}; }
    statusKey = messages.en[keyOrMessage] ? keyOrMessage : null;
    statusValues = statusKey ? values : {};
    statusRaw = statusKey ? null : keyOrMessage;
    statusError = error;
    setText('status', statusKey ? t(statusKey, statusValues) : statusRaw);
    status?.classList.toggle('error', statusError);
  };
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const idLabel = (index) => `P-${String(index + 1).padStart(2, '0')}`;

  function makePlan() {
    const duration = video.duration;
    const requested = clamp(Number(document.getElementById('intervalInput').value) || 0.25, 0.05, 5);
    const intervals = Math.max(1, Math.min(MAX_SAMPLES - 1, Math.ceil(duration / requested)));
    const step = duration / intervals;
    return { duration, requested, intervals, step, count: intervals + 1 };
  }

  function applyLocale() {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === locale)));
    document.title = 'Motion Trace';
    document.querySelector('.wordmark')?.setAttribute('aria-label', t('homeLabel'));
    document.querySelector('.language-switch')?.setAttribute('aria-label', t('languageLabel'));
    document.querySelector('.workspace')?.setAttribute('aria-label', t('workspaceLabel'));
    canvas?.setAttribute('aria-label', t('videoFrameLabel'));
    if (video.videoWidth) setText('videoMeta', t('videoMeta', { width: video.videoWidth, height: video.videoHeight, duration: video.duration.toFixed(1) }));
    updateSelection();
    if (tracks.some((track) => track.points.some(Boolean))) updateResults();
    else renderMeta();
    setStatus(statusKey || statusRaw || 'formatHelp', statusValues, statusError);
  }

  function renderMeta() {
    if (!video?.videoWidth) {
      setText('frameMeta', '—');
      return;
    }
    if (!plan) plan = makePlan();
    const time = (video.currentTime || 0).toFixed(2);
    const actual = plan.step.toFixed(3);
    const count = tracks.reduce((sum, track) => sum + track.points.filter(Boolean).length, 0);
    const expected = tracks.reduce((sum, track) => sum + Math.max(0, plan.count - nearestFrame(track.seed.timeSec)), 0);
    setText('frameMeta', count
      ? t('frameResults', { time, frames: plan.count, points: count, expected, actual })
      : t('frameCount', { time, count: plan.count, tracks: tracks.length, actual }));
  }

  function nearestFrame(timeSec) {
    if (!plan) return 0;
    return clamp(Math.round(timeSec / plan.step), 0, plan.intervals);
  }

  function updateSelection() {
    const current = select.value;
    select.innerHTML = '';
    if (!tracks.length) {
      select.add(new Option(t('noTracks'), ''));
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
    if (mode === 'seed') setStatus('clickToSeed');
    else if (mode === 'correct') setStatus('clickToCorrect');
    else setStatus('annotationOff');
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
    renderMeta();
  }

  function mapClick(event) {
    if (!mode || processing || !procWidth) return;
    if (!video.paused) return setStatus('pauseFirst', {}, true);
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
      setStatus('seeded', { id: track.id, time: timeSec.toFixed(2) });
    } else if (mode === 'correct') {
      const track = tracks.find((item) => item.id === select.value);
      if (!track) return setStatus('selectBeforeCorrect', {}, true);
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
      setStatus('corrected', { id: track.id, time: (index * (plan?.step || 0)).toFixed(2) });
    }
    render();
  }

  function waitForSeek(time) {
    return new Promise((resolve, reject) => {
      if (Math.abs(video.currentTime - time) < 0.012) return resolve();
      const onSeeked = () => { cleanup(); resolve(); };
      const onError = () => { cleanup(); reject(new Error(t('decodeError'))); };
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
    const resetButton = document.getElementById('resetButton');
    if (resetButton) resetButton.disabled = true;
    mode = '';
    canvas.classList.remove('is-interactive');
    try {
      plan = makePlan();
      if (plan.count > MAX_SAMPLES) throw new Error(t('clipLimit'));
      const returnTime = video.currentTime || 0;
      video.pause();
      const frames = [];
      for (let i = 0; i < plan.count; i += 1) {
        const frameTime = Math.min(plan.duration, i * plan.step);
        frames.push(await getGrayFrame(frameTime));
        setStatus('reading', { current: i + 1, total: plan.count, time: frameTime.toFixed(2) });
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
      setStatus('done', { points: nPoints, tracks: tracks.length, lostCount: lostTracks });
    } catch (error) {
      setStatus(error.message || 'trackFailed', {}, true);
    } finally {
      processing = false;
      seedButton.disabled = false;
      correctButton.disabled = tracks.length === 0;
      runButton.disabled = tracks.length === 0;
      if (resetButton) resetButton.disabled = false;
      updateResults();
      render();
    }
  }

  function updateResults() {
    const count = tracks.reduce((sum, track) => sum + track.points.filter(Boolean).length, 0);
    setText('resultMeta', count ? t('resultCount', { points: count, tracks: tracks.length }) : t('noDataYet'));
    const csvButton = document.getElementById('csvButton');
    const jsonButton = document.getElementById('jsonButton');
    if (csvButton) csvButton.disabled = count === 0;
    if (jsonButton) jsonButton.disabled = count === 0;
    renderMeta();
  }

  function download(name, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.hidden = true;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  function exportCSV() {
    if (!tracks.some((track) => track.points.some(Boolean))) return setStatus('noData', {}, true);
    if (!plan) return setStatus('noPlan', {}, true);
    const rows = ['track_id,frame,time_sec,x_px,y_px,confidence,method'];
    tracks.forEach((track) => track.points.forEach((point, frame) => {
      if (!point) return;
      rows.push([track.id, frame, (frame * plan.step).toFixed(4), (point.x * imageScale).toFixed(2), (point.y * imageScale).toFixed(2), point.score.toFixed(4), point.method].join(','));
    }));
    download('motion-tracks.csv', rows.join('\n'), 'text/csv;charset=utf-8');
  }

  function exportJSON() {
    if (!tracks.some((track) => track.points.some(Boolean))) return setStatus('noData', {}, true);
    if (!plan) return setStatus('noPlan', {}, true);
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
    setText('videoMeta', t('noVideo'));
    setText('frameMeta', '—');
    setText('resultMeta', t('noDataYet'));
    seedButton.disabled = true;
    correctButton.disabled = true;
    runButton.disabled = true;
    document.getElementById('csvButton').disabled = true;
    document.getElementById('jsonButton').disabled = true;
    document.getElementById('resetButton').disabled = true;
    updateSelection();
    setStatus('formatHelp');
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
      setText('videoMeta', t('videoMeta', { width: video.videoWidth, height: video.videoHeight, duration: video.duration.toFixed(1) }));
      plan = makePlan();
      seedButton.disabled = false;
      correctButton.disabled = tracks.length === 0;
      document.getElementById('resetButton').disabled = false;
      setStatus('pausePrompt');
    };
    video.onerror = () => setStatus('videoError', {}, true);
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
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
    locale = button.dataset.language;
    try { localStorage.setItem('motionTraceLocale', locale); } catch {}
    applyLocale();
  }));
  document.getElementById('intervalInput').addEventListener('input', () => {
    if (video.videoWidth) plan = makePlan();
    const hasResults = tracks.some((track) => track.points.some(Boolean));
    if (hasResults) {
      tracks.forEach((track) => { track.points = []; track.lostAt = null; });
      updateResults();
      setStatus('intervalChanged');
    }
    renderMeta();
  });
  applyLocale();
  window.addEventListener('resize', resizeOverlay);
})();
