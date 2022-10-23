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
                                                @keyup.enter="handleLogin"
                                            />
                                            <v-text-field
                                                label="Password"
                                                outlined
                                                dense
                                                color="blue"
                                                autocomplete="false"
                                                type="password"
                                                v-model="login_password"
                                                @keyup.enter="handleLogin"
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
                                    v-model="reg_fname"
                                    @keyup.enter="handleSignUp"
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
                                    v-model="reg_lname"
                                    @keyup.enter="handleSignUp"
                                />
                                    </v-col>
                                    </v-row>
                                <v-text-field
                                    label="Email"
                                    outlined
                                    dense
                                    color="blue"
                                    autocomplete="false"
                                    v-model="reg_email"
                                    @keyup.enter="handleSignUp"
                                />
                                <v-text-field
                                    label="Password"
                                    outlined
                                    dense
                                    color="blue"
                                    autocomplete="false"
                                    type="password"
                                    v-model="reg_password"
                                    @keyup.enter="handleSignUp"
                                />
                                <v-text-field
                                    label="Confirm Password"
                                    outlined
                                    dense
                                    color="blue"
                                    autocomplete="false"
                                    type="password"
                                    v-model="reg_conpassword"
                                    @keyup.enter="handleSignUp"
                                />
                                <div class="py-5"></div>
                                <v-btn @click="handleSignUp" color="blue" dark block tile>
                                    <div  v-if="isLoading">
                                        Signing up... 
                                        <v-progress-circular indeterminate color="white"></v-progress-circular>
                                    </div>
                                    <div v-else>
                                        Sign Up
                                    </div>
                                </v-btn>
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
    <Snackbar/>
</template>
<script setup>
import { defineAsyncComponent, ref } from 'vue';
import ChitChatServices from '../services/ChitChatServices';
import { setToken, setUser} from '../authentication/auth';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/app';

    const Snackbar = defineAsyncComponent( () => import('../components/SnackBar.vue'))
    const appStore = useAppStore();
    const step = ref(1)
    const login_email = ref('')
    const login_password = ref('')
    const reg_fname = ref('')
    const reg_lname = ref('')
    const reg_email = ref('')
    const reg_password = ref('')
    const reg_conpassword = ref('')
    const isLoading = ref(false)
    const router = useRouter()

    const handleLogin = async () => {
        isLoading.value = true
        try {
            const result = await ChitChatServices.login({email: login_email.value, password: login_password.value})
            setToken(result.data.token, result.data.expiration)
            setUser({ _id: result.data.user._id, name: result.data.user.name })
            router.push({ path: '/home', replace: true })
        } catch (error) {
            let message = ''
            if(!error.response.data){
                message = 'Could not connect to server. Please try again later.'
            }
            else{
                message = error.response.data.message
            }
            appStore.setSnackBar({message, type: 'error'})
        }
        isLoading.value = false;
    }

    const handleSignUp = async () => {
        isLoading.value = true
        try {
            const result = await ChitChatServices.register({
                name: reg_fname.value + ' ' + reg_lname.value,
                email: reg_email.value,
                password: reg_password.value,
                confirmPassword: reg_conpassword.value
            })
            alertType.value = 'success'
            hasError.value = true
            errorMessage.value = result.data.message
            setTimeout( () => {
                onCloseAlert()
            }, 1500)
            step.value = 1
            resetRegistrationForm();
        } catch (error) {
            hasError.value = true
            alertType.value = 'error'
            if(!error.response.data){
                errorMessage.value = 'Could not connect to server. Please try again later.'
            }
            else{
                errorMessage.value = error.response.data.message
            }
            setTimeout( () => {
                onCloseAlert()
            }, 1500)
        }
        isLoading.value = false;
    }

    const resetRegistrationForm = () => {
        reg_lname.value = ''
        reg_fname.value = ''
        reg_email.value = ''
        reg_password.value = ''
        reg_conpassword.value = ''
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
  