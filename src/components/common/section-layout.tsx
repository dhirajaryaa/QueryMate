import React from 'react'

type Props = {
    children: React.ReactNode,
    title: string,
    description?: string,
    actionUI?: React.ReactNode
}

export default function SectionLayout({ children, actionUI, title, description }: Props) {
    return (
        <div className="flex items-center justify-center w-full h-[93vh] md:px-14 py-4 flex-col gap-4 max-w-7xl mx-auto">
            <section className='w-full flex items-center justify-between gap-4 py-4 '>
                <div className='flex flex-col items-start justify-center w-fit gap-1'>
                    <h1 className='text-3xl font-bold'>{title}</h1>
                    <p className='text-sm text-muted-foreground/80'>{description}</p>
                </div>
                {actionUI}
            </section>
            {children}
        </div>
    )
};