import { useSaveScroll } from '@/composables'
import useAppShellStore from '@/stores/use-app-shell-store'

export interface IUseBackendSoftDeleteListOptions {
    /** 列表是否为空（需重新拉取首页） */
    isEmpty: () => boolean
    /** 按页拉取列表 */
    fetchPage: (page: number) => Promise<void>
    /** 「加载更多」时的当前页码 */
    getPage?: () => number
    deleteUrl: string
    recoverUrl: string
    onDeleted: (id: string) => void
    onRecovered: (id: string) => void
    headTitle: string
}

/**
 * 后台列表页共用：滚动恢复、分页加载、软删/恢复与页面标题。
 */
export function useBackendSoftDeleteList(options: IUseBackendSoftDeleteListOptions) {
    const route = useRoute()
    const appShellStore = useAppShellStore()
    const { historyPageScrollTop } = storeToRefs(appShellStore)
    const [loading, toggleLoading] = useToggle(false)

    useSaveScroll()

    /**
     * 拉取指定页列表（默认取 getPage 或第 1 页）。
     */
    async function loadMore(page?: number) {
        if (loading.value) {
            return
        }
        const targetPage = page ?? options.getPage?.() ?? 1
        toggleLoading(true)
        try {
            await options.fetchPage(targetPage)
        }
        finally {
            toggleLoading(false)
        }
    }

    /**
     * 恢复已软删条目。
     */
    async function handleRecover(id: string) {
        const { code } = await capi.get<'success' | 'error'>(options.recoverUrl, { id })
        if (code === 200) {
            showMsg({ type: 'success', content: '恢复成功' })
            options.onRecovered(id)
        }
    }

    /**
     * 软删条目。
     */
    async function handleDelete(id: string) {
        const { code } = await capi.get<'success' | 'error'>(options.deleteUrl, { id })
        if (code === 200) {
            showMsg({ type: 'success', content: '删除成功' })
            options.onDeleted(id)
        }
    }

    onMounted(() => {
        if (options.isEmpty()) {
            loadMore(1)
        }
        else {
            const scrollTop = historyPageScrollTop.value[route.path] || 0
            window.scrollTo(0, scrollTop)
        }
    })

    const headTitle = ref(options.headTitle)
    useHead({
        title: headTitle,
        meta: [
            {
                name: 'description',
                content: headTitle,
            },
        ],
    })

    return {
        loading,
        loadMore,
        handleRecover,
        handleDelete,
    }
}
