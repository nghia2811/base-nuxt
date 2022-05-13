<template>
    <div class="homepage-content">
        <div class="home-top">
            <v-container>
                <h4 class="text-h5 font-weight-medium primary--text">The Operating System for Business Operations</h4>
                <br>
                <h1 class="text-h3 font-weight-bold">The Enterprise Standard for<br>No-Code Process Orchestration</h1>
                <br>
                <div class="d-flex justify-center checkmark">
                    <div>
                        <v-icon color="green darken-1">mdi-check</v-icon>
                        <span class="teal--text text--lighten-1">100% No Code</span>
                    </div>
                    <div>
                        <v-icon color="green darken-1">mdi-check</v-icon>
                        <span class="teal--text text--lighten-1">No More Apps</span>
                    </div>
                    <div>
                        <v-icon color="green darken-1">mdi-check</v-icon>
                        <span class="teal--text text--lighten-1">No Change Management</span>
                    </div>
                </div>
                <br><br><br>
                <v-btn class="get-started-btn" color="primary" large depressed @click="()=> $router.push('/login')">Get Started</v-btn>
            </v-container>
        </div>
        <div class="bridge-block-content">
            <v-container>
                <h2 class="text-h4 font-weight-bold">The Bridge Between Business & IT</h2>
                <div class="d-flex justify-center bridge-info">
                    <div class="for-business">
                        <h3 class="text-h5 font-weight-bold">For Business<br><span class="primary--text">Operations</span></h3>
                        <br>
                        Automate any business process, no code or change management required.
                        <img alt="no-code" :src="require(`~/assets/image/home/business.png`)"/>
                    </div>
                    <div class="for-technology">
                        <h3 class="text-h5 font-weight-bold">For Business<br><span class="teal--text text--lighten-2">Technology</span></h3>
                        <br>
                        Create a standard that improves both governance and business agility.
                        <img alt="no-code" :src="require(`~/assets/image/home/it.png`)"/>
                    </div>
                </div>
            </v-container>
        </div>
        <div class="highlight-feature-block">
            <v-container>
                <h2 class="text-h4 font-weight-bold">Everything you need to drive operational efficiency</h2>
                <br>
                <p class="teal--text text--lighten-1">
                    {{ appName }} enables enterprises to scale automation, reduce IT burden,<br>
                    and deliver millions in ROI—with time-to-value in days.
                </p>
                <ul class="d-flex justify-center list-feature">
                    <li>
                        <div class="feature-item">
                            <img alt="no-code" :src="require(`~/assets/image/home/No-Code.png`)"/>
                            <div>100% No-Code</div>
                        </div>
                    </li>
                    <li>
                        <div class="feature-item">
                            <img alt="Fully Composable" :src="require(`~/assets/image/home/Composable.png`)"/>
                            <div>Fully Composable</div>
                        </div>
                    </li>
                    <li>
                        <div class="feature-item">
                            <img alt="Human-In-The-Loop" :src="require(`~/assets/image/home/Accessibility.png`)"/>
                            <div>Human-In-The-Loop</div>
                        </div>
                    </li>
                    <li>
                        <div class="feature-item">
                            <img alt="Handle Any Complexity" :src="require(`~/assets/image/home/Complexity.png`)"/>
                            <div>Handle Any<br>Complexity</div>
                        </div>
                    </li>
                    <li>
                        <div class="feature-item">
                            <img alt="Rapid & Iterative Development" :src="require(`~/assets/image/home/Agile.png`)"/>
                            <div>Rapid & Iterative<br>Development</div>
                        </div>
                    </li>
                    <li>
                        <div class="feature-item">
                            <img alt="Enterprise-Grade Governance" :src="require(`~/assets/image/home/Data-Governance.png`)"/>
                            <div>Enterprise-Grade<br>Governance</div>
                        </div>
                    </li>
                </ul>
            </v-container>
        </div>
        <div class="get-started">
            <v-container>
                <h2 class="text-h4 font-weight-bold">Interested?</h2>
                <br><br>
                <v-btn class="get-started-btn" color="primary" large depressed @click="()=> $router.push('/builder')">Get Started</v-btn>
            </v-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'IndexPage',
        auth: false,
        data() {
            return {
                appName: 'Kinitiras'
            }
        },
        mounted() {
            this.$services.app.hideLoading()
        }
    }
</script>

<style lang="scss">
    .homepage-content { text-align: center;
        .home-top {display: block;padding: 80px 0;
            .checkmark { flex-wrap: wrap;
                > div {padding: 0 20px;}
            }
        }
        .bridge-block-content {display: block;background: #f7f8fb; padding: 80px 0;
            .bridge-info { margin-top: 50px; text-align: left;
                .for-business,
                .for-technology {position: relative;width: auto;max-width: 300px;background: #fff;border-radius: 15px; margin: 0 20px; height: auto;min-height: 300px; padding: 35px; box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
                    img {position: absolute; top: -120px; width: 200px;display: block;margin: 0;height: auto;}
                }
                .for-business {
                    img {right: 100%; margin-right: -50px;}
                }
                .for-technology {
                    img {left: 100%; margin-left: -50px;}
                }
            }
        }
        .highlight-feature-block {display: block; padding: 80px 0 60px; max-width: 1200px; margin: 0 auto;
            .list-feature { list-style: none; margin: 50px 0 0 0; padding: 0; flex-wrap: wrap; line-height: 1.5;
                > li {width: 100%;padding: 20px; max-width: 360px;
                    > div {display: block; border-radius: 15px;border: 1px solid #eee; padding: 30px 15px; font-weight: 500; font-size: 22px;}
                    .feature-item {display: block; box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
                        > div {display: block;margin-top: 30px;}
                    }
                    img {display: block;width: auto;height: 100px;margin: 0 auto;}
                }
            }
        }
        .get-started {display: block;background: #f7f8fb; padding: 80px 0; }
    }
</style>
