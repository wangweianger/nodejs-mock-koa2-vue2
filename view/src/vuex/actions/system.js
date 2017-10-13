import * as types from '../mutation-types'

export function updateCurTime({ dispatch, state }) {
    dispatch(types.SET_CUR_TIME, Date.now() + state.system.timeDeviation)
}

export function setTimeDeviation({ dispatch, state }, timeDeviatio) {
    dispatch(types.SET_TIME_DEVIATION, timeDeviatio)
    updateCurTime({ dispatch, state })
}
