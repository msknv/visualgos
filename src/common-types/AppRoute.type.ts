import { ReactNode } from 'react';

export type AppRoute = {
    url: string,
    text: string,
    umbrella?: string,
    textMobile?: string,
    icon?: ReactNode
}
