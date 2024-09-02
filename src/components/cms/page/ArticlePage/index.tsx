import { OptimizelyNextPage as CmsComponent } from "@remkoj/optimizely-cms-nextjs";
import {
  ArticlePageDataFragmentDoc,
  type ArticlePageDataFragment,
} from "@/gql/graphql";
import { getSdk } from "@/sdk";
import {
  CmsEditable,
  getServerContext,
} from "@remkoj/optimizely-cms-react/rsc";
import { getLabel } from "@/labels";
import { RichText } from "@remkoj/optimizely-cms-react/components";
import { CmsImage } from "@/components/shared/cms_image";
import { DateDisplay } from "@/components/shared/date";

export const ArticlePagePage: CmsComponent<ArticlePageDataFragment> = async ({
  data,
  contentLink,
}) => {
  const { factory } = getServerContext();
  const andLabel = await getLabel("and", {
    locale: contentLink.locale,
    fallback: "and",
  });
  const byLabel = await getLabel("By", {
    locale: contentLink.locale,
    fallback: "By",
  });
  const publishedLabel = await getLabel("Published on", {
    locale: contentLink.locale,
    fallback: "Published on",
  });
  const authorCount: number = data.articleAuthors?.length ?? 0;
  const authors =
    authorCount > 1
      ? `${data.articleAuthors?.slice(0, -1).join(", ")} ${andLabel} ${
          data.articleAuthors?.slice(-1)[0]
        }`
      : data.articleAuthors?.join(", ") ?? "";
  const articleDate: string | undefined = data.metadata?.published ?? undefined;

  // <pre className="w-full overflow-x-hidden font-mono text-sm">{ JSON.stringify(data, undefined, 4) }</pre>

  return (
    <div className="relative md:w-3/4 mx-auto">
      <div className="aspect-[5/2] md:aspect-[5/1] relative w-full lg:aspect-[3/1] lg:z-[-10] mt-5">
        <CmsImage
          src={data.articleHeroImage}
          alt="hero-image"
          aria-hidden
          priority
          fill
          className="object-cover"
        />
      </div>
      <div className="outer-padding">
        <div className="mx-auto z-[50] mb-8">
          <div className="mx-auto prose max-w-screen-xl py-16">
            <CmsEditable as="h1" cmsFieldName="articleTitle">
              {data.articleTitle}
            </CmsEditable>
            <CmsEditable
              as="div"
              cmsFieldName="articleAuthors"
              className="font-bold text-people-eater -mt-8"
            >
              {byLabel} {authors}
            </CmsEditable>
            <div className="mb-5">
              {publishedLabel}: <DateDisplay value={articleDate} />
            </div>
            <CmsEditable
              as={RichText}
              cmsFieldName="articleBody"
              text={data.articleBody?.json}
              factory={factory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Bind the data fetching fragment
 *
 * @returns     The fragment to use to fetch data for an Article Page
 */
ArticlePagePage.getDataFragment = () => [
  "ArticlePageData",
  ArticlePageDataFragmentDoc,
];

/**
 * Resolve the metadata for a given instance of an Article Page
 *
 * @param       contentLink     The current Article Page
 * @returns     The Next.JS metadata for the page
 */
ArticlePagePage.getMetaData = async (contentLink) => {
  const sdk = getSdk();
  const response = await sdk.getArticlePageMetaData(contentLink);
  const experienceData = (response?.BlankExperience?.items || [])[0];
  const title =
    experienceData?.SeoSettings?.metaTitle ??
    experienceData?._metadata?.displayName ??
    "Unnamed blank experience";
  return {
    title: title,
  };
};

export const dynamic = "force-static";
export default ArticlePagePage;
