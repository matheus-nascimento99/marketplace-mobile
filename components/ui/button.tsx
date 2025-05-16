import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex flex-row rounded-card items-center',
  variants: {
    variant: {
      solid:
        'bg-orange-base disabled:bg-orange-dark disabled:opacity-50 flex-1',
      outline: 'bg-transparent border border-orange-base flex-1',
      link: 'bg-transparent items-center gap-2',
    },
    size: {
      md: 'py-4 px-5',
      sm: 'py-2.2 px-4',
      xs: 'p-4',
      '2xs': 'p-2.2',
      link: 'p-0.5',
    },
  },
  compoundVariants: [
    {
      size: ['md', 'xs'],
      class: 'h-14 justify-between',
    },
    {
      size: ['sm'],
      class: 'h-10 justify-center',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

type ButtonProps = TouchableOpacityProps & VariantProps<typeof button>

export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={button({ variant, size, className })}
      activeOpacity={0.5}
      {...props}
    />
  )
}
