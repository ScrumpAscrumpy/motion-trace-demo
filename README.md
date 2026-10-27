# Motion Trace

A small browser demo for creating point-trajectory annotations from a local video.

## Try it

Open the [live demo](https://scrumpascrumpy.github.io/motion-trace-demo/), choose a browser-decodable video, and follow the steps:

1. Pause at a frame and choose **Place points**. Click one visually distinctive location on each object to create a track ID. These are manual starting points, not automatic object detections.
2. Set the **Sample interval** in seconds. This is the target time between analyzed frames. Smaller intervals capture faster motion but require more processing. The page shows the actual interval used (the tracker is limited to 120 sampled frames).
3. Choose **Track forward**. Local image-patch matching extends each point through the video. Low-confidence tracks stop and should be reviewed. Use **Correct selected** to add a manual position and rerun tracking.
4. Export the resulting point annotations as CSV or JSON.

The selected video is processed locally in the browser; it is not uploaded. MP4/H.264 and WebM are the most portable choices. AVI playback depends on the browser codec.

## Data and limits

Exports contain point trajectories (`track_id`, frame, time, pixel coordinates, match confidence, and annotation method). This is a draft point-label format, not instance masks or certified ground truth. Review and correct tracks before training. The tracker is a simple local patch-matching method; it can lose objects during occlusion, low texture, or large motion and does not identify object classes.

## 中文说明

打开[在线演示](https://scrumpascrumpy.github.io/motion-trace-demo/)，选择浏览器可解码的视频：

1. 暂停在目标画面，选择“放置点”，在每个对象清晰且有纹理的位置点击一次，建立轨迹编号。此点是人工指定的起始位置，并非自动检测。
2. 设置“采样间隔”（秒），即相邻分析帧的目标时间差。间隔越小，越容易记录快速运动，但处理时间更长。界面会显示实际采用的间隔；最多采样 120 帧。
3. 点击“向后追踪”。程序用局部图像块匹配延伸轨迹；匹配置信度不足时会停止。可用“修正选中轨迹”增加人工位置，再重新运行追踪。
4. 将点轨迹标注导出为 CSV 或 JSON。

视频只在当前浏览器本地处理，不会上传。MP4/H.264 和 WebM 通常兼容性较好；AVI 是否可播放取决于浏览器解码器。

导出内容是待复核的点轨迹（轨迹编号、帧号、时间、像素坐标、匹配置信度和标注方式），不是实例分割掩膜或已认证的真实值。遮挡、纹理不足或大幅运动都可能造成追踪丢失；本演示也不会识别对象类别。用于训练前请人工检查和修正。
