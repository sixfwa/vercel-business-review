import { type CmsLayoutComponent } from "@remkoj/optimizely-cms-react"
import type CarouselRowLayoutProps from './carousel.row.opti-style.json'
import { extractSettings, type LayoutProps } from "@remkoj/optimizely-cms-react/components"
import dynamic from 'next/dynamic'

const Carousel = dynamic(() => import("./carousel"), { ssr: true });

export const CarouselRow : CmsLayoutComponent<LayoutProps<typeof CarouselRowLayoutProps>> = ({ layoutProps, contentLink, children }) => {
    const {} = extractSettings(layoutProps)
    // Count the number of items
    const itemCount = Array.isArray(children) ? children.length : 1

    // Wrap items, if possible
    const items = Array.isArray(children) ? children.map((child, idx) => {
        const key = `carousel_${ contentLink?.key ?? 'n/a' }_slide_${ idx }`
        return <div key={ key } style={{
            flex: `0 0 var(--item-width)`,
            width: `var(--item-width)`,
            display: "inline-block",
            paddingLeft: "15px",
            paddingRight: "15px"
          }}>{ child }</div>
    }) : children
    return <Carousel itemCount={ itemCount }>{ items }</Carousel>
}

export default CarouselRow