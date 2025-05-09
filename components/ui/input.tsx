import React, { ComponentProps, forwardRef } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface RootProps extends ComponentProps<typeof View> {
  children: React.ReactNode
}

export const Root = ({
  children,
  ...props
}: RootProps & { className?: string }) => {
  return (
    <View className="group flex flex-col" {...props}>
      {children}
    </View>
  )
}

interface TextWithClassName extends ComponentProps<typeof Text> {
  className?: string
}

export const Label = ({ className, style, ...props }: TextWithClassName) => {
  return (
    <Text
      className={twMerge(
        'font-label text-[12px] uppercase leading-tight text-gray-300 group-focus-within:text-orange-base',
        className,
      )}
      style={style}
      {...props}
    />
  )
}

interface ViewWithClassName extends ComponentProps<typeof View> {
  className?: string
}

export const Content = ({ className, style, ...props }: ViewWithClassName) => {
  return (
    <View
      className={twMerge(
        'flex h-12 flex-row items-center gap-2 border-b !border-b-gray-100 focus:!border-b-red-500',
        className,
      )}
      style={style}
      {...props}
    />
  )
}

export const Prefix = ({ className, style, ...props }: ViewWithClassName) => {
  return <View className={className} style={style} {...props} />
}

interface TextInputWithClassName extends ComponentProps<typeof TextInput> {
  className?: string
}

export const ControlInput = forwardRef<TextInput, TextInputProps>(
  ({ className, style, ...props }: TextInputWithClassName, ref) => {
    return (
      <TextInput
        ref={ref}
        className={twMerge(
          'w-full text-[16px] text-gray-400 placeholder:text-gray-200 focus:caret-orange-base focus:outline-none',
          className,
        )}
        style={style}
        {...props}
      />
    )
  },
)

ControlInput.displayName = 'ControlInput'

export const Error = ({ className, ...props }: ComponentProps<typeof View>) => {
  return (
    <View
      className={twMerge(
        'mt-1 flex select-none flex-row items-center gap-1 font-body text-body-xs',
        className,
      )}
      {...props}
    />
  )
}

export const Suffix = ({ className, style, ...props }: ViewWithClassName) => {
  return <View className={className} style={style} {...props} />
}
