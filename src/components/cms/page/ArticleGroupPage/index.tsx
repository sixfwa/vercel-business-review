import { OptimizelyNextPage as CmsComponent } from "@remkoj/optimizely-cms-nextjs";
import {
  ArticleGroupPageDataFragmentDoc,
  type ArticleGroupPageDataFragment,
} from "@/gql/graphql";
import { getArticles } from "./api";
import { Button } from "@/components/shared/button";
import { RichText } from "@remkoj/optimizely-cms-react/components";
import {
  getServerContext,
  CmsEditable,
  CmsContentArea,
} from "@remkoj/optimizely-cms-react/rsc";
import { linkDataToUrl } from "@/components/shared/cms_link";
import { Card } from "@/components/shared/Card";

export const ArticleGroupPagePage: CmsComponent<
  ArticleGroupPageDataFragment
> = async ({ data, contentLink }) => {
  const articles = contentLink.key
    ? await getArticles(contentLink.key, contentLink.locale)
    : { total: 0, items: [] };
  const { factory } = getServerContext();

  return (
    <div className="mx-auto">
      <div className="text-center mb-10 mx-auto">
        <CmsEditable
          as="h1"
          cmsFieldName="articleGroupTitle"
          className="text-[48pt] font-bold"
        >
          {data.articleGroupTitle ?? ""}
        </CmsEditable>
      </div>
      <div className="flex text-center">
        <CmsEditable
          as={RichText}
          text={data.articleGroupIntro?.json}
          cmsFieldName="articleGroupIntro"
          factory={factory}
          className="mx-auto text-3xl"
        />
      </div>
      <CmsContentArea
        items={data.MainContent}
        fieldName="MainContent"
        className="w-full mt-[32pt]"
      />

      <div className="grid grid-cols-2 gap-2">
        {articles.items.map((item) => {
          const url = item.link ? linkDataToUrl(item.link) : undefined;
          return (
            <Card key={item.key} className="h-full">
              <div className="flex flex-col gap-5 border h-full border-black p-5">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <RichText as="div" text={item.intro} />
                <Button url={url} className="font-bold my-auto">
                  Read More
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
ArticleGroupPagePage.getDataFragment = () => [
  "ArticleGroupPageData",
  ArticleGroupPageDataFragmentDoc,
];

export default ArticleGroupPagePage;
