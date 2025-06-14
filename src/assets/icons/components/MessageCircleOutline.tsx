import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgMessageCircleOutline = (
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
    <g fill="currentColor" clipPath="url(#message-circle-outline_svg__a)">
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
      <path d="M19.07 4.93a10 10 0 0 0-16.28 11c.096.199.127.422.09.64L2 20.8a1 1 0 0 0 .605 1.13q.19.075.395.07h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zm.83 8.36a8 8 0 0 1-11 6.08 3.3 3.3 0 0 0-1.25-.26 3.4 3.4 0 0 0-.56.05l-2.82.57.57-2.82a3.1 3.1 0 0 0-.21-1.81 8 8 0 0 1 13.033-8.762A8 8 0 0 1 19.9 13.29" />
    </g>
    <defs>
      <clipPath id="message-circle-outline_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgMessageCircleOutline)
const Memo = memo(ForwardRef)
export default Memo
