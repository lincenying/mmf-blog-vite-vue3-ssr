import type { MockMethod } from 'vite-plugin-mock'

// @ts-expect-error 1111
import { createProdMockServer } from 'vite-plugin-mock/client'

const modules: Objable = import.meta.glob('../mock/*.ts', { eager: true })

const _mockModules: Array<MockMethod> = []
Object.keys(modules).forEach((key) => {
    if (key.includes('/_')) {
        return
    }

    _mockModules.push(...modules[key].default)
})

export const mockModules = _mockModules

export function setupProdMockServer() {
    createProdMockServer(_mockModules)
}
