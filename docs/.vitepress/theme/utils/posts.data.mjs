import {createContentLoader} from 'vitepress';

const pages = createContentLoader('/posts/**/*.md', {
    includeSrc: false,
    render: false,
    excerpt: false,
    transform(rawData) {
        return rawData.sort((a, b) => {
            return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date);
        });
    },
});

export default pages;