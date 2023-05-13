import React, { useContext, useEffect, useState } from 'react'
import MonthlyChart from '../AnalyticalComponents/MonthlyChart'
import axios from 'axios'
import { Baseurl } from '../../contants/Baseurl'
import { AppContext } from '../../AppContext'
import Loading1 from '../LoadingComponents/Loading1'

const AP = () => {
  const [MonData, setMonData] = useState([])
  const {data} = useContext(AppContext)
  const [Load, setLoad] = useState(false)
  axios.defaults.headers.common['Authorization'] =`Token ${data}`

  const monthlydata = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/monthly`)
      console.log(response.data)
      setMonData(response.data)
      setLoad(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    monthlydata()
  }, [])

  return (
    <div>
      {Load?<MonthlyChart  data={MonData}/>:<Loading1/>}
      
      
      
    </div>
  )
}

export default AP
