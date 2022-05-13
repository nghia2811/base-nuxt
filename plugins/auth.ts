export default function ({$auth}: any) {
    $auth.onError((error: any, name: any, endpoint: any) => {
        console.error(name, error)
    })
    // $auth.onRedirect((to: string, from: string) => {
    //     console.error(to)
    // })
}
