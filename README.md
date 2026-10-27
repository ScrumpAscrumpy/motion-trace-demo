# Motion Trace

A small browser demo for creating point-trajectory annotations from a local video.

## Try it

Open the [live demo](https://scrumpascrumpy.github.io/motion-trace-demo/). Choose a browser-decodable video, pause at a frame, place one point seed per object, then run **Track forward**. Use **Correct selected** to add a manual anchor at the current frame. Export annotations as CSV or JSON.

The page processes the selected video locally in your browser. It does not upload the video or require an account. The browser must support the video's codec; MP4/H.264 and WebM are the most portable choices. AVI support varies.

## Data and limits

Exports contain point trajectories (`track_id`, frame, time, pixel coordinates, match confidence, and annotation method). This is a compact point-label format, not instance masks. Tracks are draft annotations: review low-confidence or interrupted tracks and correct them before using them for training. This demo does not certify ground truth or replace a dedicated segmentation/tracking validation workflow.

The tracker uses local image-patch matching around manually placed points. It is a simple demo method, can lose objects during occlusion or large motion, and does not identify object classes.
