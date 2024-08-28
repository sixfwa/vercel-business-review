import 'server-only'
import { CmsComponent } from '@remkoj/optimizely-cms-react'
import { getServerContext } from '@remkoj/optimizely-cms-react/rsc'
import { type TestimonialElementDataFragment, TestimonialElementDataFragmentDoc } from '@/gql/graphql'
import { RichText } from '@remkoj/optimizely-cms-react/components'
import { CmsEditable } from '@remkoj/optimizely-cms-react/rsc'
import { CmsImage } from '@/components/shared/cms_image'

export const TestimonialElement : CmsComponent<TestimonialElementDataFragment> = ({ 
    data: { 
        referenceText,
        customerImage,
        customerLocation,
        customerName
    }, 
    contentLink: { 
        key 
    } }) => {
    const { factory } = getServerContext()
    return <CmsEditable as="figure" className='testimonial' cmsId={ key }>
        <RichText as="blockquote" text={ referenceText?.json } factory={ factory } className='rich-text m-0 p-0 border-l-0 prose-p:mt-0' />
        <figcaption>
            <cite className="ml-4 lg:flex lg:justify-start lg:items-center not-italic">
                <p className="whitespace-nowrap align-middle mt-0 mb-2 lg:mb-0">
                    { customerImage && <CmsImage src={ customerImage } alt={ customerName ?? "" } width={200} height={200} className='rounded-full h-12 w-12 mr-3 not-prose inline-block' /> }
                    { customerName ?? "" }
                </p>
                { customerLocation && <>
                    <span className="mx-2 hidden lg:inline-block">—</span>
                    <p className="!text-[1.2rem] lg:!text-[1.6rem] my-0">{ customerLocation }</p>
                </> }
            </cite>
        </figcaption>
    </CmsEditable>
}
TestimonialElement.getDataFragment = () => ['TestimonialElementData', TestimonialElementDataFragmentDoc]

export default TestimonialElement