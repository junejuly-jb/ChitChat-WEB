<template>
    <v-container>
        <v-row align="center" justify="center" >
            <v-col cols="12" sm="10">
                <v-card class="elevation-6 mt-10"  >
                    <v-window v-model="step">
                        <v-window-item :value="1">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-card-text class="mt-12">
                                    <h4 class="text-center">Login in to Your Account</h4>
                                    <h6 class="text-center  grey--text ">
                                        Log in to your account so you can continue builiding <br>connections to others.
                                    </h6>
                                    <v-row align="center" justify="center">
                                        <v-col cols="12" sm="8">
                                            
                                            <v-text-field
                                                label="Email"
                                                dense
                                                color="blue"
                                                autocomplete="false"
                                                class="mt-16"
                                                v-model="login_email"
                                            />
                                            <v-text-field
                                                label="Password"
                                                outlined
                                                dense
                                                color="blue"
                                                autocomplete="false"
                                                type="password"
                                                v-model="login_password"
                                            />
                                            <div>
                                                <div class="py-5">
                                                    <span class="red">Forgot password</span>
                                                </div>
                                            </div>

                                            <v-btn @click="handleLogin" color="blue" dark block tile>
                                                <div v-if="!isLoading">LOGIN</div>
                                                <div v-else>
                                                    <v-progress-circular
                                                    :size="20"
                                                    :width="3"
                                                    color="white"
                                                    indeterminate
                                                    ></v-progress-circular>
                                                </div>
                                            </v-btn>
                                
                                            <h5 class="text-center  grey--text mt-4 mb-3">Or Log in using</h5>
                                            <div class="d-flex  justify-space-between align-center mx-10 mb-16">
                                                <v-btn depressed outlined>
                                                    <v-icon color="red">fa fa-google</v-icon>
                                                </v-btn>
                                                <v-btn depressed outlined>
                                                    <v-icon color="blue">fa fa-facebook-f</v-icon>
                                                </v-btn>
                                                <v-btn depressed outlined>
                                                    <v-icon color="light-blue lighten-3">fa fa-twitter</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>  
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" md="6" class="bg-blue rounded-bl-xl" >
                                <div style="  text-align: center; padding: 180px 0;">
                                    <v-card-text class="white--text" >
                                        <h3 class="text-center ">Don't Have an Account Yet?</h3>
                                        <h6
                                        class="text-center"
                                        >Let's get you all set up so you can start creating your your first<br>  onboarding experience</h6>
                                    </v-card-text>
                                    <div class="text-center">
                                        <v-btn @click="step++" :disabled="isLoading"><div class="text_blue">SIGN UP</div></v-btn>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                        </v-window-item>
                        <v-window-item :value="2">
                        <v-row >
                            <v-col cols="12" md="6" class="bg-blue rounded-br-xl">
                            <div style="  text-align: center; padding: 180px 0;">
                            <v-card-text class="white--text" >
                                <h3 class="text-center ">Already Signed up?</h3>
                                <h6
                                class="text-center"
                                >Log in to your account so you can continue connecting and<br>  communicating with your colleagues and friends</h6>
                            </v-card-text>
                            <div class="text-center">
                                <v-btn @click="step--" :disabled="isLoading"><div class="text_blue">Log in</div></v-btn>
                            </div>
                            </div>
                            </v-col>

                            <v-col cols="12" md="6">
                            <v-card-text class="mt-12">
                                <h4
                                class="text-center"
                                >Sign Up for an Account</h4>
                                <h6
                                class="text-center  grey--text "
                                >Let's get you all set up so you can start creating your <br>
                                first onboarding experience</h6>
                                <v-row align="center" justify="center">
                                <v-col cols="12" sm="8">
                                    <v-row>
                                    <v-col cols="12" sm="6">
                                    <v-text-field
                                    label="First Name"
                                    outlined
                                    dense
                                    color="blue"
                                    autocomplete="false"
                                    class="mt-4"
                                />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                    <v-text-field
                                    label="Last Name"
                                    outlined
                                    dense
                                    color="blue"
                                    autocomplete="false"
                                    class="mt-4"
                                />
                                    </v-col>
                                    </v-row>
                                <v-text-field
                                    label="Email"
                                    outlined
                                    dense
                                    color="blue"
                                    autocomplete="false"
                                />
                                <v-text-field
                                    label="Password"
                                    outlined
                                    dense
                                    color="blue"
                                    autocomplete="false"
                                    type="password"
                                />
                                <div class="py-5"></div>
                                <v-btn color="blue" dark block tile>Sign up</v-btn>
                            
                                <h5
                                class="text-center  grey--text mt-4 mb-3"
                                >Or Sign up using</h5>
                                <div class="d-flex  justify-space-between align-center mx-10 mb-11">
                                <v-btn depressed outlined>
                                <v-icon color="red">fa fa-google</v-icon>
                                </v-btn>
                                <v-btn depressed outlined>
                                <v-icon color="blue">fa fa-facebook</v-icon>
                                </v-btn>
                                <v-btn depressed outlined>
                                <v-icon color="light-blue lighten-3">fa fa-twitter</v-icon>
                                </v-btn>
                                </div>
                                </v-col>
                                </v-row>  
                            </v-card-text>
                            </v-col>
                        </v-row>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';

    const step = ref(1)
    const login_email = ref('')
    const login_password = ref('')
    const isLoading = ref(false)

    const handleLogin = () => {
        isLoading.value = true
        console.log(login_email.value, login_password.value)
    }
</script>

<style scoped>
    .v-application .rounded-bl-xl {
        border-bottom-left-radius: 300px !important;
    }
    .v-application .rounded-br-xl {
        border-bottom-right-radius: 300px !important;
    }

    .text_blue{
        color: dodgerblue;
    }
</style>
  