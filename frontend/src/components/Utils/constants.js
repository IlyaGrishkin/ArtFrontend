import axios from "axios";
 

function getTopics() {
    let res = []
    const apiUrl = `http://localhost:8000/api/v1/tests/subjects/get`
    axios.get(apiUrl).then((resp) => {
        const serverData = resp.data.data.items
        for (let obj of serverData) {
            res.push(obj.subject)
        } 
        })
    return res
}


export const topics = {
    TOPICS: getTopics(),
    LENGTH: 3,
}

export const testDurations = ['0-5', '5-10', '10-15', '15-30']
export const testDurationsStrToNums = {
    '0-5': [0, 1, 2, 3, 4],
    '5-10': [5, 6, 7, 8, 9],
    '10-15': [10, 11, 12, 13, 14],
    '15-30': [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
}

export const questionsNumber = ['0-10', '10-15', '15-20', '20-30']
export const questionsNumberStrToNum = {
    '0-10': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    '10-15': [10, 11, 12, 13, 14],
    '15-20': [15, 16, 17, 18, 19],
    '20-30': [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
}

export const BootstrapBreakpoints = {
    'sm': 576,
    'md': 768,
    'lg': 992,
    'xl': 1200,
    'xxl': 1400
}


export const SERVER_HOST  = "http://127.0.0.1:8000"
export const CLIENT_HOST = "http://localhost:3000"

export const URLS = {
    HOME: "http://localhost:3000",
    FINISH_TEST: "",
    TEST_RESULT: "http://localhost:3000/0/results/",
    LOGIN_CHECK: "http://localhost:3000/login/check/",
    SIGNUP: "http://localhost:3000/signup/",
    SIGNUP_CONFIRM: "http://localhost:3000/signup/confirm/"
}



export const API_URLS = {
    GET_ALL_TESTS: `http://localhost:8000/api/v1/tests/`,
    GET_ALL_CARDS: `http://localhost:8000/api/v1/guide/`,

    FINISH_TEST: "http://localhost:8000/api/v1/tests/attempt/end",
    GET_TEST_RESULT: "http://localhost:8000/api/v1/tests/attempt/result",
    CREATE_TEST: "http://localhost:8000/api/v1/tests/attempt/create",
    UPDATE_TEST: "http://localhost:8000/api/v1/tests/attempt/update",

    GET_INFO: "http://localhost:8000/api/v1/customers/get_info",
    GET_ATTEMPT_INFO: "http://localhost:8000/api/v1/tests/attempt/info",

    GET_CONFIRM: `http://localhost:8000/api/v1/customers/get/confirm`,
    CREATE_CONFIRM: "http://localhost:8000/api/v1/customers/create/confirm",
    GET_SEND_CODE: `http://localhost:8000/api/v1/customers/get/send_code`,
    CREATE_SEND_CODE: `http://localhost:8000/api/v1/customers/create/send_code`,
    GET_TEST_SESSION: 'http://localhost:8000/api/v1/tests/test_session/get_test_id',
}

export function getUserAttempts(testID) {
    return `http://localhost:8000/api/v1/tests/${testID}/attempts/user`
}


export function startTest(testID) {
    return `http://localhost:3000/card/${testID}/1/`
}

export function getTestResult() {
    return `http://localhost:3000/results/`
}

export function getGuideCardData(ID) {
    return `http://localhost:8000/api/v1/guide/${ID}`
}

export function getGuideCard(ID) {
    return `http://localhost:3000/guide-card/${ID}/`
}

export function getTest(testID){
    return `http://localhost:8000/api/v1/tests/${testID}`
}
