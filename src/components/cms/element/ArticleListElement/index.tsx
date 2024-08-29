/*
    This is used on the landing page to show the articles
**/
import "server-only";
import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  type ArticleListElementDataFragment,
  type Locales,
  type InputMaybe,
  ArticleListElementDataFragmentDoc,
} from "@/gql/graphql";
import { getSdk } from "@/sdk";
import DateDisplay from "@/components/shared/date";
import { getLabel } from "@/labels";
import { RichText } from "@remkoj/optimizely-cms-react/components";
import { getServerContext } from "@remkoj/optimizely-cms-react/rsc";
import { Card } from "@/components/shared/Card";
import { headers } from "next/headers";
import Link from "next/link";

export const ArticleListElement: CmsComponent<
  ArticleListElementDataFragment
> = async ({
  data: { articleListCount = 3, geoCountries = false },
  contentLink: { locale },
}) => {
  const { factory } = getServerContext();
  const sdk = getSdk();
  const headersList = headers();
  const country = headersList.get("X-User-Country") || "US";
  const articles = (
    (
      await sdk.getArticleListElementItems({
        count: articleListCount || 3,
        locale: locale as InputMaybe<Locales> | undefined,
        country: geoCountries ? country : undefined,
      })
    )?.ArticlePage?.items ?? []
  ).filter(isNotNullOrUndefined);

  const andLabel = await getLabel("and", { locale, fallback: "and" });

  return (
    <div className="flex flex-col gap-5">
      {articles.map((article) => {
        let authors: string | undefined = undefined;
        const authorList = (article.articleAuthors ?? []).filter(
          isNotNullOrUndefined
        );
        if (authorList.length > 1) {
          const lastAuthor = authorList.slice(-1);
          const firstAuthors = authorList.slice(0, -1);
          authors = `${firstAuthors.join(", ")} ${andLabel} ${lastAuthor[0]}`;
        } else {
          authors = authorList[0];
        }

        return (
          <div key={article.articleMeta?.key}>
            {/* @ts-ignore */}
            <Link href={article._metadata?.url.default ?? ""}>
              <Card
                cardColor="white"
                as="article"
                className="flex flex-row border border-black p-5 min-h-max h-64"
              >
                <div className="flex flex-col">
                  <DateDisplay value={article.articleMeta?.published ?? null} />
                  <h3 className="mb-5 text-3xl font-bold">
                    {article?.articleTitle ?? ""}
                  </h3>
                  {article?.articleSummary && (
                    <RichText
                      factory={factory}
                      text={article?.articleSummary?.json}
                    />
                  )}
                </div>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
ArticleListElement.getDataFragment = () => [
  "ArticleListElementData",
  ArticleListElementDataFragmentDoc,
];

export default ArticleListElement;

function isNotNullOrUndefined<T>(input?: T | null | undefined): input is T {
  return input ? true : false;
}
