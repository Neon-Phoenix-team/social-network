import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgMoreHorizontalOutline = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    ref={ref}
    {...props}
  >
    <g fill="currentColor" clipPath="url(#more-horizontal-outline_svg__a)">
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
    </g>
    <defs>
      <clipPath id="more-horizontal-outline_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgMoreHorizontalOutline)
const Memo = memo(ForwardRef)
export default Memo
