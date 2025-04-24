document.getElementById("uploadBtn").addEventListener("click", function() {
    const audioFile = document.getElementById("audioFile").files[0];

    if (!audioFile) {
        alert("请先选择一个音频文件！");
        return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    fetch("http://localhost:5000/upload_audio", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            displayPatterns(data.patterns);
        } else {
            alert("生成图案失败，请重试！");
        }
    })
    .catch(error => {
        console.error("上传音频出错:", error);
        alert("发生错误，请稍后再试！");
    });
});

// 显示生成的图案
function displayPatterns(patterns) {
    const patternsContainer = document.getElementById("patterns");
    patternsContainer.innerHTML = ''; // 清空现有图案

    patterns.forEach((url, index) => {
        const patternDiv = document.createElement("div");
        patternDiv.classList.add("pattern");

        const img = document.createElement("img");
        img.src = url;
        patternDiv.appendChild(img);

        const arLink = document.createElement("button");
        arLink.textContent = "AR 试戴";
        arLink.onclick = () => {
            window.location.href = `ar.html?img=${url}`;
        };
        patternDiv.appendChild(arLink);

        const playLink = document.createElement("button");
        playLink.textContent = "播放声音";
        playLink.onclick = () => {
            window.location.href = `play.html?img=${url}&audio=${patterns.audio}`;
        };
        patternDiv.appendChild(playLink);

        patternsContainer.appendChild(patternDiv);
    });
}
