import {_shopifyCustomClient} from "../../index";

let articlesQuery: (pages: number, cursor?: string) => any = (pages, cursor = ''): any => {

    return _shopifyCustomClient.graphQLClient.query((root) => {
        let args = { first: pages };
        if(cursor) { args['after'] = cursor; }

        root.addConnection('articles', {args: args}, (article) => {
            article.add('title');
            article.add('excerptHtml');
            article.add('handle');
            article.add('publishedAt');
            article.add('authorV2', function (author) {
                author.add("name");
            });
            article.add('image', function (image) {
                image.add("altText");
                image.add("originalSrc");
            });
        });
    });
};

let blogsQuery: (slug: string) => any = (slug): any => {

    return _shopifyCustomClient.graphQLClient.query((root) => {
        root.addConnection('blogs', {args: {first: 1}}, (blog) => {
            blog.add('articleByHandle', {
                args: {
                    handle: slug
                }
            }, function (article) {
                article.add('id');
                article.add('content');
                article.add('contentHtml');
                article.add('excerpt');
                article.add('excerptHtml');
                article.add('handle');
                article.add('image', function (options) {
                    options.add("altText");
                    options.add("originalSrc");
                });
                article.add('publishedAt');
                article.add('seo', function (options) {
                    options.add("title");
                    options.add("description");
                });
                article.add('authorV2', function (author) {
                    author.add("name");
                });
                article.add('tags');
                article.add('title');
                article.add('url');
            });
        });
    });
};

export {
    articlesQuery,
    blogsQuery
}
