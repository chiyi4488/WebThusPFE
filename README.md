# WebThusProject

## 緣起
本專案緣起僅為修習「web前端設計」課程──期中作業為改造「[中華民國資訊管理學會](https://www.csim.org.tw/)」 網頁排版設計。

> 聲明：本儲存庫之所有有關中華民國資訊管理學會的文字、圖片、內容，版權皆不屬我；其餘網站設計，版權屬我。

### 特色：
 - 以 Jekyll 開發
   - 網頁模組化（Jekyll）
   - 文章以 Markdown 格式呈現，透過 Jekyll 轉碼成 HTML（絕大多數）
   - 需要重複使用的 HTML 內容，透過 Jekyll 以 For Loop 等形式呈現
 - 設計語言
   - 支援 RWD
   - 以「區塊化」為設計語言去設計
   - 色彩一致性，以藍、灰色為主要基調
   - 從零開始設計網頁，無套用任何範本（Bootstrap Template）
 - 設計小巧思
   - 活動花絮 Carousel 化
   - **點選活動花絮 Carousel 圖片，會有放大檢視的效果 (Viewer)**
   - 提供「回到頂部」按鈕（在頁尾）
   - 最新消息列表，含括從古至今所有的最新消息文章
   - 「關於學會」等網頁，提供文章目錄（Table of Content），以標題為目錄基準
   - 嚴格遵守「標題一 h1、標題二 h2、標題三 h3...」（以此類推）規格

## 挑戰
完成這項作業，我對於自己有設下幾項挑戰，列於以下：

  - 不使用網頁範本（Bootstrap Template）：
    - 並非唾棄直接編輯網頁範本的行為；單純只是以前很常改範本，這次想挑戰自己，從零開始寫一個網站（且運用過去所學）。
    - 畢竟如果一生都寫網頁都建立在改他人範本，感覺自己就失去了從零開始設計網頁的能力（或者說，沒辦法證明自己有從零開始設計網頁的能力）。
  - 嘗試使用 [Bootstrap Studio](https://bootstrapstudio.io/) 工具去設計網頁
    - 以前就知曉過這項軟體（畢竟 GitHub Education 裏有提供這項軟體免費），但一直沒機會去體驗看看。
  - 製作出一個使用者體驗合理的網頁 (排版、色彩)，RWD 是肯定會去處理的。

## 製作過程

### 初心者？
其實我真的花了很久時間去製作，高手組截止日前也沒來得及繳出去（很大的原因是覺得當時設計，沒有設計得很好；其次是我還沒整合進去 Jekyll 框架），以下是我 Before & After 的示範圖：

| Before   | After    | 
| --- | ------- | 
| ![image](https://github.com/chiyi4488/WebThusProject/assets/30853081/0597c01f-2824-4bb2-9c04-0069eda07bd8) | ![image](https://github.com/chiyi4488/WebThusProject/assets/30853081/5e8bf3ea-4c19-4062-a608-ef5170b43230) | 

（應該可以看出來吧:D，Before 的內文區只有白底，但 After 底色改成灰色，加上了白色的區塊設計<3）

### 重拾者？
老實說，一頁式網頁真的比較簡單，但製作一整個網站就真的很累了；因此，我將臨期中時我才重拾、繼續做。大概列點以下：

> (D+* 是隨意估算的)

  - D+1 ~ D+3：逐步將原本的一頁式網頁設計，套入 Jekyll 框架；主要工作項目：
    - 把網站共同使用的內容，放入 _layouts 內，並依使用情境，設定 posts, pages 兩種版面（皆套娃最底層的 default）
    - 把部分最新消息內容，放入 _posts 內，並設定套用 posts 版面
  - D+4 ~ D+6：逐步處理單網頁（像是關於學會、各校資管系所、活動花絮等，非最新消息的網頁）
    -  關於學會：非常多頁，所以我決定押後處理（感謝瑞凡處理掉）。
    -  各校資管系所：感謝雅思的爬蟲，讓我可以直接 JSON 套 DataTables 快速解決。
    -  活動花絮：這搞了我好幾個小時。但如果只是把相同 HTML 碼複製成好幾份（然後改圖檔和內文），有點浪費 Jekyll 的優勢。
        -  因此我選擇，將活動花絮的圖檔、連結、標題，存入 Jekyll 的變數，再利用 Jekyll 的 For Loop，去邏輯化呈現網頁。
        -  Carousel 如上揭亦同 (Jekyll For Loop)。
    -  側邊欄，因為首頁 home 和最新消息 posts 都會使用到；但如果要套娃的話有點難套，因此改寫到 _includes 資料夾，讓整個網站都可以透過 `{% includes sidebar.html %}` 去引用該段 HTML。
```html
---
layout: pages
title: "活動花絮"
permalink: /galleries
galleryList:
 - title: 第22屆海峽兩岸資訊管理發展與策略學術研討會
   date: 2016-07-29
   img: "/assets/img/thumbnail/dscn0006_diao_zheng_da_xiao_.jpg"
   url: "/gallery/8110"
 - title: 第二十七屆國際資訊管理學術研討會 (ICIM 2016)，靜宜大學
   date: 2016-05-21
   img: "/assets/img/thumbnail/img_1165.jpg"
   url: "/gallery/8108"
<div class="row">
    {% for gallery in page.galleryList %}
    <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12" style="margin-bottom: 20px;">
        <a href="{{ gallery.url }}" style="text-decoration: none;">
            <div class="card justify-content-center" style="max-width: 50rem;">
                <img src="{{ gallery.img }}" class="card-img-top" alt="{{ gallery.title }}縮圖">
                <div class="card-header">
                    {{ gallery.date }}
                </div>
                <div class="card-body" style="height: 150px;">
                    <h5 class="card-title">{{ gallery.title }}</h5>
                </div>
            </div>
        </a>
    </div>
    {% endfor %}
</div>
```
  - D+7 ~ D+9：最新消息的消息總表設計：
    - 我原本想透過安裝 `jekyll-paginate` 外掛，去製作消息總表。但不知道為什麼，一直無法安裝成功並使用。後來就選擇用預設函數 `site.posts` 去呈現，唯一缺點是無法總表多頁顯示化。
    - 再後來，我嘗試安裝 `jekyll-paginate-v2` 外掛，結果安裝成功了！所以就開始運用它，去設計總表，並成功套用總表多頁顯示化。
  - D+10 ~ D+11：重新設計首頁：
    - 我依然覺得首頁很醜 (Before)，後來剛好在查資料時，看到了這種**白色區塊式**的設計，就開始著手去改寫首頁。
    - 後來改寫成功後，就又開始改寫最新消息、其他網頁的設計，讓整個網站都充斥著**白色區塊式**的設計<3
    - 側邊欄改以邏輯製作，跑三次迴圈 `資訊管理學會`、`學校`、`業界`，大幅降低撰寫重複 HTML 的比例。
    - 新增 Carousel 點圖放大功能。
  - D+12 ~ D+14：感謝我大哥趙定宇，提供爬蟲指令檔，讓我可以一次性就把「所有最新消息」都放入網站。
  - D+15：雜事
    - 修復最新消息 - 分類總表的邏輯，並套用總表多頁顯示化。
    - 設計登入 Modal (以及註冊按鈕 Popovers)。
    - 關於學會 > 會議記錄/資料下載，以 Jekyll For Loop 呈現。
    - 原本想要整合 CSS 的，但因為我寫得太散，一堆都寫 `style=""`，導致真的很難整合（求教學），所以最後沒整理幾個起來。
    - 調整各項 CSS 色彩和細節，例如導覽列的各項文字顏色、hover 時的背景色彩等。
  - D+16：設計 TOC（文章目錄）
    - 原本想要設計的是會漂浮的 TOC Card（飄在右側），但後來發現有點難做，再加上做了之後，想像起來和目前網站風格有點難搭配，因此放棄。
    - 後來選擇用 Gird 去切割，留個 `col-3` 在左側給 TOC，然後結合 `sticky-top` 讓網頁瀏覽時可以固定在右側。
    - 然後發現 RWD 小螢幕時設計會出事，因此 ChatGPT 建議我寫兩段一樣的 HTML，搭配不同的 Class（`d-lg-none` 之類的）。
    - 再後來想說：好啦！我再做更細節一點好了，讓 `<h6>本文目錄</h6>` 在 `/ENGLISH` 網頁時，是顯示 `<h6>Contents</h6>`。
    - 註：我使用 [/allejo/jekyll-toc](https://github.com/allejo/jekyll-toc) 作為 TOC 自動生成。
```html
<div class="sticky-top d-none d-lg-block TOC" style="top: 120px; text-align: left;">
    {% if page.url == "/english" %}
        <h6>Contents</h6>
    {% else %}
        <h6>本文目錄</h6>
    {% endif %}
    {% include toc.html html=content %}
</div>
<div class="d-lg-none TOC" style="text-align: left;">
    {% if page.url == "/english" %}
        <h6>Contents</h6>
    {% else %}
        <h6>本文目錄</h6>
    {% endif %}
    {% include toc.html html=content %}
    <hr />
</div>
```
  - D+17：完成 `/ENGLISH` 頁：
    - 發現 `<blockquote>` 原先的設計依然使用黑體，引述的強調性不太高，因此因入 `Noto Serif TC` 字型，改以明體式設計，以凸顯其引述區塊效果。
    - 調整全網黑體的字重
    - 新增回到頁首按鈕

## 結語與展望
回顧挑戰：
>  - 不使用網頁範本（Bootstrap Template）：
>    - 並非唾棄直接編輯網頁範本的行為；單純只是以前很常改範本，這次想挑戰自己，從零開始寫一個網站（且運用過去所學）。
>    - 畢竟如果一生都寫網頁都建立在改他人範本，感覺自己就失去了從零開始設計網頁的能力（或者說，沒辦法證明自己有從零開始設計網頁的能力）。
>  - 嘗試使用 [Bootstrap Studio](https://bootstrapstudio.io/) 工具去設計網頁
>    - 以前就知曉過這項軟體（畢竟 GitHub Education 裏有提供這項軟體免費），但一直沒機會去體驗看看。
>  - 製作出一個使用者體驗合理的網頁 (排版、色彩)，RWD 是肯定會去處理的。

做到今天，我想我應該可以來檢查一下每項挑戰：

 - [x] 不使用網頁範本（Bootstrap Template）
 - [x] 嘗試使用 [Bootstrap Studio](https://bootstrapstudio.io/) 工具去設計網頁
      - 結論：很難用。下次寫網頁基本上不考慮使用它。
 - [x] 製作出一個使用者體驗合理的網頁 (排版、色彩)，RWD 是肯定會去處理的。
      - 結論：經過這麼多後，我很滿意我在這次作業當中，所做的每一件事<3；也真的很挑戰我自己，更是讓我在網頁設計裏成長許多（能力&技能 ⬆️UP）
      
## 銘謝
 - [Bootstrap Studio](https://bootstrapstudio.io/)
 - [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2)
 - [/allejo/jekyll-toc](https://github.com/allejo/jekyll-toc)
 - 雅思的各校資管系所列表 JSON
 - 趙哥的爬蟲
 - 瑞凡的凱瑞
