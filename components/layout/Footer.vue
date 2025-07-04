<template>
    <footer class="footer">
        <nav class="footer__menu">
            <ul class="footer__menu-list">
                <li class="footer__menu-list__item">
                    <RouterLink
                        active-class="active"
                        to="/"
                    >
                        <Icon
                            name="mingcute:home-3-line"
                            class="footer-icon"
                            size="40"
                        />
                    </RouterLink>
                </li>
                <li class="footer__menu-list__item">
                    <RouterLink to="/statistic">
                        <Icon
                            name="uil:statistics"
                            class="footer-icon"
                            size="40"
                        />
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </footer>
</template>

<style lang="scss">
@use '/styles/mixins' as *;
@use '/styles/variables' as *;

.footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;

    &__menu {
        &-list {
            list-style-type: none;
            display: flex;
            gap: toRem(25);

            &__item {
                .footer-icon {
                    background: #838383;
                }

                .active {
                    .footer-icon {
                        background: $main-color;
                    }
                }
            }
        }
    }
}
</style>
