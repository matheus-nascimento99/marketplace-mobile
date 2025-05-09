import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex flex-row rounded-card items-center',
  variants: {
    variant: {
      solid: 'bg-orange-base',
      outline: 'bg-transparent border border-orange-base',
    },
    size: {
      md: 'py-4 px-5',
      sm: 'py-2.2 px-4',
      xs: 'p-4',
      '2xs': 'p-2.2',
    },
  },
  compoundVariants: [
    {
      size: ['md', 'xs'],
      class: 'h-14 justify-between',
    },
    {
      size: ['md', 'xs'],
      class: 'h-14',
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
