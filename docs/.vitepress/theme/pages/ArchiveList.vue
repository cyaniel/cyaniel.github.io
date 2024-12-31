<template>
  <div class="archive-container">
    <div v-for="year in sortedYears" :key="year" class="year-group">
      <div class="year-title">{{ year }}</div>
      <div class="archive-list">
        <div v-for="item in groupedPages[year]" :key="item.url" class="archive-item">
          <div class="item-content">
            <span class="archive-title">
              <a :href="item.url" class="title-text">{{ item.frontmatter.title }}</a>
            </span>
            <span class="archive-date">{{ item.frontmatter.date }}</span>
          </div>
          <hr class="divider" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { data as pages } from "../utils/posts.data";

// 格式化日期为 MM-DD
const formattedPages = pages.map(item => {
  const date = new Date(item.frontmatter.date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit'
  }).replace('/', '-');
  return {
    ...item,
    frontmatter: {
      ...item.frontmatter,
      date,
      year: new Date(item.frontmatter.date).getFullYear(),
    },
  };
});

// 按年份分组
const groupedPages = formattedPages.reduce((acc, item) => {
  const year = item.frontmatter.year;
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(item);
  return acc;
}, {});

// 按年份排序（从新到旧）
const sortedYears = Object.keys(groupedPages).sort((a, b) => b - a);
</script>

<style scoped>
.archive-container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.year-group {
  margin-bottom: 30px; /* 增大年份组之间的间隔 */
}

.year-title {
  font-size: 1.5em; /* 年份字体大小 */
  font-family: 'Helvetica Neue', Arial, sans-serif; /* 使用黑体 */
  color: #000; /* 年份颜色为黑色 */
  font-weight: bold; /* 加粗年份 */
  margin-bottom: 10px; /* 年份与标题之间的间隔 */
}

.archive-list {
  margin-left: 20px; /* 文章列表整体向右偏移，与年份对齐 */
}

.archive-item {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.archive-title {
  flex: 1; /* 标题占据剩余空间 */
}

/* 标题文字样式 */
.title-text {
  text-decoration: none;
  color: #000; /* 标题颜色为黑色 */
  font-size: 1.1em; /* 标题字体大小 */
  font-family: 'Helvetica Neue', Arial, sans-serif; /* 使用黑体 */
  font-weight: normal; /* 不加粗标题 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

/* 仅当悬停在标题文字上时改变样式 */
.title-text:hover {
  color: #333; /* 鼠标悬停时标题颜色加深 */
}

.archive-date {
  color: #666; /* 日期颜色为浅灰色 */
  font-size: 0.85em; /* 日期字体大小 */
  font-family: 'Helvetica Neue', Arial, sans-serif; /* 使用黑体 */
  width: 80px; /* 固定宽度 */
  text-align: right; /* 右对齐 */
  margin-left: 10px; /* 日期与标题之间的间距 */
}

.divider {
  border: none;
  border-top: 1px dashed #ddd;
  margin: 5px 0;
}
</style>
