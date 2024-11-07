function calculatePoints() {
    const str = parseInt(document.getElementById("str").value) || 0;
    const dex = parseInt(document.getElementById("dex").value) || 0;
    const pow = parseInt(document.getElementById("pow").value) || 0;
    const con = parseInt(document.getElementById("con").value) || 0;
    const app = parseInt(document.getElementById("app").value) || 0;
    const edu = parseInt(document.getElementById("edu").value) || 0;
    const siz = parseInt(document.getElementById("siz").value) || 0;
    const int = parseInt(document.getElementById("int").value) || 0;
    const luck = parseInt(document.getElementById("luck").value) || 0;

    const totalPoints = str + dex + pow + con + app + edu + siz + int + luck;
    const totalPointsNoLuck = str + dex + pow + con + app + edu + siz + int;

    document.getElementById("totalPoints").textContent = totalPoints;
    document.getElementById("totalPointsNoLuck").textContent = totalPointsNoLuck;

    calculateHP();
    calculateSAN();
    calculateMagicPoints();
    calculateMove();
}

function calculateHP() {
    const con = parseInt(document.getElementById("con").value) || 0;
    const siz = parseInt(document.getElementById("siz").value) || 0;
    const maxHP = Math.floor((con + siz) / 10);
    document.getElementById("maxHP").value = maxHP;
    document.getElementById("currentHP").value = maxHP;
}

function calculateSAN() {
    const pow = parseInt(document.getElementById("pow").value) || 0;
    document.getElementById("maxSAN").value = 99;
    document.getElementById("currentSAN").value = pow;
}

function calculateMagicPoints() {
    const pow = parseInt(document.getElementById("pow").value) || 0;
    const magicPoints = Math.floor(pow / 5);
    document.getElementById("magicPoints").value = magicPoints;
}

function calculateMove() {
    const dex = parseInt(document.getElementById("dex").value) || 0;
    const str = parseInt(document.getElementById("str").value) || 0;
    const siz = parseInt(document.getElementById("siz").value) || 0;
    const age = parseInt(document.getElementById("age").value) || 0;

    let move = 0;
    if (dex < siz && str < siz) {
        move = 7;
    } else if (dex >= siz || str >= siz || (dex === siz && str === siz)) {
        move = 8;
    } else if (dex > siz && str > siz) {
        move = 9;
    }

    if (age >= 40 && age <= 49) {
        move -= 1;
    } else if (age >= 50 && age <= 59) {
        move -= 2;
    } else if (age >= 60 && age <= 69) {
        move -= 3;
    } else if (age >= 70 && age <= 79) {
        move -= 4;
    } else if (age >= 80 && age <= 89) {
        move -= 5;
    }

    document.getElementById("move").value = move;
}

function calculateSkillTotal(skillElement) {
    const row = skillElement.parentElement.parentElement;
    const initial = parseInt(row.cells[1].querySelector('input').value) || 0;
    const growth = parseInt(row.cells[2].querySelector('input').value) || 0;
    const profession = parseInt(row.cells[3].querySelector('input').value) || 0;
    const interest = parseInt(row.cells[4].querySelector('input').value) || 0;
    const total = initial + growth + profession + interest;

    row.cells[5].textContent = total;
    row.cells[6].textContent = Math.floor(total / 2); // 困难成功率
    row.cells[7].textContent = Math.floor(Math.floor(total / 2) / 2); // 极难成功率

    updatePointsUsed();
}

function updatePointsUsed() {
    let professionPointsUsed = 0;
    let interestPointsUsed = 0;

    document.querySelectorAll('.skill-table tbody tr').forEach(row => {
        const profession = parseInt(row.cells[3].querySelector('input').value) || 0;
        const interest = parseInt(row.cells[4].querySelector('input').value) || 0;
        professionPointsUsed += profession;
        interestPointsUsed += interest;
    });

    document.getElementById("professionPointsUsed").textContent = professionPointsUsed;
    document.getElementById("interestPointsUsed").textContent = interestPointsUsed;
}

function generateCommand() {
    const str = document.getElementById("str").value || 0;
    const dex = document.getElementById("dex").value || 0;
    const pow = document.getElementById("pow").value || 0;
    const con = document.getElementById("con").value || 0;
    const app = document.getElementById("app").value || 0;
    const edu = document.getElementById("edu").value || 0;
    const siz = document.getElementById("siz").value || 0;
    const int = document.getElementById("int").value || 0;
    const luck = document.getElementById("luck").value || 0;
    const magicPoints = document.getElementById("magicPoints").value || 0;
    const maxHP = document.getElementById("maxHP").value || 0;

    let command = `.st 力量${str}str${str}敏捷${dex}dex${dex}意志${pow}pow${pow}体质${con}con${con}外貌${app}app${app}教育${edu}edu${edu}体型${siz}siz${siz}智力${int}灵感${int}san${pow}san值${pow}理智${pow}理智值${pow}幸运${luck}运气${luck}mp${magicPoints}魔法${magicPoints}hp${maxHP}体力${maxHP}`;

    document.querySelectorAll('.skill-table tbody tr').forEach(row => {
        const skillName = row.querySelector('.skill-name').value.trim();
        const skillSubname = row.querySelector('.skill-subname') ? row.querySelector('.skill-subname').value.trim() : '';
        const customSubname = row.querySelector('.custom-subname') ? row.querySelector('.custom-subname').value.trim() : '';
        const total = parseInt(row.cells[5].textContent.trim()) || 0;

        if (total > 0) {
            let finalSkillName = skillName;
            if (skillSubname && skillSubname !== '自定义') {
                finalSkillName += `:${skillSubname}`;
            } else if (customSubname) {
                finalSkillName += `:${customSubname}`;
            }

            // 检查是否包含冒号
            if (finalSkillName.includes(':')) {
                // 只取冒号之后的部分
                const skillNameAfterColon = finalSkillName.split(':').slice(1).join(':');
                command += `${skillNameAfterColon}${total}`;
            } else {
                // 如果没有冒号，直接使用技能名
                command += `${finalSkillName}${total}`;
            }
        }
    });

    document.getElementById("dice-command").value = command;
}

// 监听技能子名称选择框的变化
document.querySelectorAll('.skill-subname').forEach(select => {
    select.addEventListener('change', function() {
        const customSubname = this.parentElement.querySelector('.custom-subname');
        if (this.value === '自定义') {
            customSubname.style.display = 'inline';
        } else {
            customSubname.style.display = 'none';
            customSubname.value = '';
        }
    });
});

function displayPortrait(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            document.getElementById("portraitContainer").innerHTML = "";
            document.getElementById("portraitContainer").appendChild(img);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function generateAndDownloadImage() {
    // 使用html2canvas将指定区域的HTML内容转换为Canvas
    html2canvas(document.querySelector(".container")).then(canvas => {
        // 获取Canvas的高度
        let canvasHeight = canvas.height;
        let maxHeight = 8000; // 设置最大高度，超过此高度则拆分成两张图片

        if (canvasHeight <= maxHeight) {
            // 如果Canvas的高度小于等于最大高度，直接下载
            let imgData = canvas.toDataURL("image/png");
            downloadImage(imgData, "coc7_character_card_part1.png");
        } else {
            // 如果Canvas的高度超过最大高度，拆分成两张图片
            let part1 = document.createElement("canvas");
            let part2 = document.createElement("canvas");

            part1.width = canvas.width;
            part1.height = maxHeight;
            part2.width = canvas.width;
            part2.height = canvasHeight - maxHeight;

            let ctx1 = part1.getContext("2d");
            let ctx2 = part2.getContext("2d");

            // 绘制第一部分
            ctx1.drawImage(canvas, 0, 0, canvas.width, maxHeight, 0, 0, canvas.width, maxHeight);
            // 绘制第二部分
            ctx2.drawImage(canvas, 0, maxHeight, canvas.width, canvasHeight - maxHeight, 0, 0, canvas.width, canvasHeight - maxHeight);

            // 将Canvas转换为Data URL
            let imgData1 = part1.toDataURL("image/png");
            let imgData2 = part2.toDataURL("image/png");

            // 下载两张图片
            downloadImage(imgData1, "coc7_character_card_part1.png");
            downloadImage(imgData2, "coc7_character_card_part2.png");
        }
    });
}

function downloadImage(imgData, fileName) {
    // 创建一个隐藏的下载链接
    let downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = fileName;

    // 将链接添加到文档中并触发点击事件
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 移除下载链接
    document.body.removeChild(downloadLink);
}
