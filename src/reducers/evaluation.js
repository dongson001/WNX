import {
  GET_EVALUATION_PROBLEM_BEGIN,
  GET_EVALUATION_PROBLEM_SUCCESS,
  GET_EVALUATION_PROBLEM_FAIL,
  CHECK_EVALUATION_BEGIN,
  CHECK_EVALUATION_SUCCESS,
  CHECK_EVALUATION_FAIL,
  SAVE_EVALUATION_BEGIN,
  SAVE_EVALUATION_SUCCESS,
  SAVE_EVALUATION_FAIL,
  RESET_EVALUATION
} from '../constants/actionTypes'

const defaultState = {
  getEvaluationProblemIsBegin: false,
  checkEvalationIsBegin: false,
  saveEvalationIsBegin: false
}
export default function evaluation(state = defaultState, action) {
  switch (action.type) {
    case GET_EVALUATION_PROBLEM_BEGIN:
      return Object.assign({}, state, {
        getEvaluationProblemIsBegin: true
      })
    case GET_EVALUATION_PROBLEM_SUCCESS:
      return Object.assign({}, state, {
        getEvaluationProblemIsBegin: false,
        getEvaluationProblem: action.result
      })
    case GET_EVALUATION_PROBLEM_FAIL:
      return Object.assign({}, state, {
        getEvaluationProblemIsBegin: false,
        getEvaluationProblemErrorCode: action.errorCode,
				getEvaluationProblemErrorMessage: action.errorMessage
      })

    case CHECK_EVALUATION_BEGIN:
      return Object.assign({}, state, {
        checkEvalationIsBegin: true
      })
    case CHECK_EVALUATION_SUCCESS:
      return Object.assign({}, state, {
        checkEvalationIsBegin: false,
        checkEvalationResult: {
          result: action.result
        }
      })
    case CHECK_EVALUATION_FAIL:
      return Object.assign({}, state, {
        checkEvalationIsBegin: false,
        errorCode: action.errorCode,
        errorMessage: action.errorMessage
      })

    case SAVE_EVALUATION_BEGIN:
      return Object.assign({}, state, {
        saveEvalationIsBegin: true
      })
    case SAVE_EVALUATION_SUCCESS:
      return Object.assign({}, state, {
        saveEvalationIsBegin: false,
        saveEvalationResult: action.result
      })
    case SAVE_EVALUATION_FAIL:
      return Object.assign({}, state, {
        saveEvalationIsBegin: false,
        errorCode: action.errorCode,
        errorMessage: action.errorMessage
      })
    case RESET_EVALUATION:
      return defaultState
    default:
      return state
  }
}
