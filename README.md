# vertigis-custom-components

## Sync WDD components

`git remote add vertigis https://dev.azure.com/waterschapdedommel/Datamanagement/_git/vertigis_viewers
--squash`

`git subtree add --prefix=WDD vertigis main`

`git subtree add --prefix=WDD https://dev.azure.com/waterschapdedommel/Datamanagement/_git/vertigis_viewers main --squash`

`git subtree pull --prefix=WDD https://dev.azure.com/waterschapdedommel/Datamanagement/_git/vertigis_viewers main`

Optional: --squash