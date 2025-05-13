// Typing animation
let typed = new Typed(".typing", {
    strings:["Web Developer", "Android Developer", "Software Engineer"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})

// Aside
const nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
totalNavList = navList.length,
allSection = document.querySelectorAll(".section"),
totalSection = allSection.length;
for(let i = 0; i < totalNavList; i++)
{
    const a = navList[i].querySelector("a")
    a.addEventListener("click", function()
    {
        removeBackSection();
        for(let j = 0; j < totalNavList; j++)
        {
            if(navList[j].querySelector("a").classList.contains("active"))
            {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active")
        }
        this.classList.add("active")
        showSection(this);
        if(window.innerWidth < 1200)
        {
            asideSectionTogglerBtn();
        }
    })
}
function removeBackSection()
{
    for(let i = 0; i < totalSection; i++)
    {
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num)
{
    allSection[num].classList.add("back-section");
}
function showSection(element)
{
    /*  下面註解外的 target 變數是簡化後的樣子
    const href = element.getAttribute("href").split("#");
    target = href[1];
    console.log(target)
    */
    for(let i = 0; i < totalSection; i++)
    {
        allSection[i].classList.remove("active")
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}
function updateNav(element)
{
    for(let i = 0; i < totalNavList; i++)
    {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
        {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".contact-me").addEventListener("click", function()
{
    const sectionIndex = this.getAttribute("data-section-index");
    // console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})
const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");
      navTogglerBtn.addEventListener("click", () =>
      {
          asideSectionTogglerBtn();
      })
      function asideSectionTogglerBtn()
      {
          aside.classList.toggle("open"); // 如果有open類別,則移除;否,則新增
          navTogglerBtn.classList.toggle("open");
          for(let i = 0; i < totalSection; i++)
          {
              allSection[i].classList.toggle("open");
          }
      }

// Award img
// function updateImageHeights() {
//     const img1 = document.querySelector('.img1');
//     const img2 = document.querySelector('.img2');
//     const img3 = document.querySelector('.img3');

//     if (img1 && img2 && img3) {
//         const viewportWidth = window.innerWidth; // 獲取視窗寬度
//         const initialImg2Height = 235.3;

//         if (viewportWidth > 991) {
//             // 視窗寬度大於 991px，img2 和 img3 跟隨 img1 的高度
//             const img1Height = img1.offsetHeight;
//             img2.style.height = img1Height + 'px';
//             img3.style.height = img1Height + 'px';
//         } else {
//             // 視窗寬度小於等於 991px，img3 跟隨 img2 的高度
//             img2.style.height = Math.max(img2.offsetHeight, initialImg2Height) + 'px';
//             img3.style.height = img2.style.height;
//         }
//     }
// }

// // 當網頁載入或視窗縮放時，更新高度
// window.addEventListener('load', updateImageHeights);
// window.addEventListener('resize', updateImageHeights);

// modal
document.addEventListener("DOMContentLoaded", function () {
    const demoButtons = document.querySelectorAll(".demo-btn");
    const modal = document.querySelector(".modal");
    const modalVideo = document.querySelector(".modal-video");
    const modalImage = document.querySelector(".modal-image");
    const modalSource = modalVideo.querySelector("source");
    const modalDescription = document.querySelector(".modal-description"); // 選取描述文字
    const backButton = document.querySelector(".modal-arrow-left");
    const nextButton = document.querySelector(".modal-arrow-right");

    let mediaList = [];  // 存放該按鈕的所有媒體
    let descriptionsList = []; // 存放該按鈕的所有描述
    let currentStep = 0; // 目前顯示的索引
    
    // 🔹 當按鈕被點擊，讀取該按鈕的 media 和 descriptions 資料
    demoButtons.forEach(button => {
        button.addEventListener("click", function () {
            const mediaData = this.getAttribute("data-media"); 
            const descriptionsData = this.getAttribute("data-descriptions"); // 取得描述內容
            
            if (mediaData && descriptionsData) {
                mediaList = JSON.parse(mediaData); // 解析 JSON 陣列
                descriptionsList = JSON.parse(descriptionsData); // 解析描述 JSON 陣列
                currentStep = 0; // 重設索引
                showMedia(currentStep); // 顯示第一個媒體
                modal.style.display = "flex"; // 顯示 modal
            }
        });
    });

    // 🔹 顯示當前索引的媒體
    function showMedia(index) {
        if (index >= mediaList.length || index < 0) return; // 避免超過範圍

        const mediaSrc = mediaList[index];
        const descriptionText = descriptionsList[index]

        // 更新描述
        modalDescription.textContent = descriptionText;

        if (mediaSrc.endsWith(".mp4")) {
            modalImage.style.display = "none"; // 隱藏圖片
            modalVideo.style.display = "block"; // 顯示影片

            modalVideo.pause();
            modalSource.src = mediaSrc;
            modalVideo.load();

            modalVideo.onloadeddata = () => {
                modalVideo.play().catch(error => console.error("播放錯誤:", error));
            };
        } else {
            modalVideo.style.display = "none"; // 隱藏影片
            modalImage.style.display = "block"; // 顯示圖片
            modalImage.src = mediaSrc;
        }

        // 🔹 控制 `Next` 和 `Back` 按鈕是否顯示
        backButton.style.opacity = (index > 0) ? "1" : "0";
        nextButton.style.opacity = (index < mediaList.length - 1) ? "1" : "0";
    }

    // 🔹 點擊 Next 按鈕時，切換到下一個媒體
    nextButton.addEventListener("click", function () {
        if (currentStep < mediaList.length - 1) {
            currentStep++;
            showMedia(currentStep);
        }
    });

    // 🔹 點擊 Back 按鈕時，切換到上一個媒體
    backButton.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showMedia(currentStep);
        }
    });

    // 點擊 modal 以外的區域時關閉 modal
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalVideo.pause(); // 暫停影片
        }
    });
});

window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav a");
  
    let currentId = "";
  
    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].offsetTop;
      const sectionHeight = sections[i].offsetHeight;
  
      if (window.scrollY >= sectionTop - 150) {
        currentId = sections[i].getAttribute("id");
      }
    }
  
    const scrollBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;
    if (Math.abs(scrollBottom - documentHeight) < 5) {
      currentId = sections[sections.length - 1].getAttribute("id");
    }
  
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentId)) {
        link.classList.add("active");
      }
    });
  });