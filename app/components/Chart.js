import React from 'react'
import { View, Text} from "react-native"

/* import { ChartDot, ChartPath, ChartPathProvider, ChartXLabel, ChartYLabel, monotoneCubicInterpolation} from "@rainbow-me/animated-charts" */
import moment from 'moment'

import { SIZES, COLORS, FONTS } from "../constants"

const Chart = ({containerStyle, chartPrices}) => {

    //Points
    /* let startUnixTimestamp = moment().subtract(7, 'day').unix()
    let data = chartPrices ? chartPrices.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : [] */

    /* let points = monotoneCubicInterpolation({data, range: 40}) */

    return (
        <View style={{ ...containerStyle}}>
            {/* Chart */}
            {/* {
                data.length > 0 &&
                <ChartPathProvider>

                </ChartPathProvider>
            } */}
        </View>
    )
}

export default Chart;