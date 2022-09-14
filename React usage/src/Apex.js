import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { GrEdit,GrSave } from 'react-icons/gr';
import * as Actions from 'app/store/actions';
import './style.css'
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
    title:{
        width: '100%',
        textAlign: 'center',
    },
    tunnelImg:{
        margin: '24px auto',
    },
    infosRight:{
        width: '100%',
        textAlign: 'left',
        fontSize:'24px',
        fontWeight:'bold',
        padding:'2px 12px'
    },
    infosRB:{
        width: '100%',
        textAlign: 'left',
        fontSize:'12px',
        padding:'2px 12px'
    },
    list: {
      width: 500,
    },
    fullList: {
      width: 'auto',
    },
    threshold:{
        position: 'absolute',
        right: '10px',
        top: '0px',
        height: '50px',
    },
    firstTable:{
        marginTop:'10px',
        marginBottom:'40px',
        '& .MuiTableContainer-root':{
            padding:"12px"
        },
        '& .MuiTable-root':{
            border: 'solid 1px #deeaf6'
        }
    },
    secondTable:{
        marginTop:'10px',
        '& .MuiTableContainer-root':{
            padding:"12px"
        },
        '& .MuiTable-root':{
            border: 'solid 1px #deeaf6'
        }
    },
    tableDetails:{
        marginLeft:'12px',
        marginBottom:'12px',
    },
    edit:{
        position: 'absolute',
        right: '-12px',
        top: '12px',
        zIndex:9999
    },
    save:{
        position: 'absolute',
        right: '-12px',
        top: '12px',
        zIndex:9999
    },
    editInput:{
        '& .MuiFormControl-root':{
            width: '70px',
            border: 'none',
        },
        '& label + .MuiInput-formControl': {
            marginTop: 0
        },
        '& .MuiInputLabel-animated': {
           display:'none'
        },
        '& .MuiInput-underline:before':{
            borderBottom:0
        }
    }
  });
  

  const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#deeaf6",
        color: "#000",
    },
    body: {
        fontSize: 14,
    },
    root:{
        padding: '0px 16px',
        position:'relative'
    }
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


function ApexChart () {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation('ctm');
    const [displayThresholdList, setDisplayThresholdList] = useState(true)
    const thresh = useSelector(({ ctm }) => ctm.aMeasurement && ctm.aMeasurement.threshold && ctm.aMeasurement.threshold.threshold);
    const sh = useSelector(({ ctm }) => ctm.aMeasurement.settlementHistory);
    const dfct = useSelector(({ ctm }) => ctm.aMeasurement.distanceFromCrossTunnel);
    const [fullData, setFullData] = useState([])
    const [threshold, setThreshold] = useState([])
    const [dateX, setDateX] = useState([])
    const [A, setA] = useState([])
    const [AData, setAData] = useState([])
    const [B, setB] = useState([])
    const [BData, setBData] = useState([])
    const [C, setC] = useState([])
    const [CData, setCData] = useState([])
    const [D, setD] = useState([])
    const [DData, setDData] = useState([])
    const [天端, set天端] = useState([])
    const [天端Data, set天端Data] = useState([])
    const [左上, set左上] = useState([])
    const [左上Data, set左上Data] = useState([])
    const [右上, set右上] = useState([])
    const [右上Data, set右上Data] = useState([])
    const [左下, set左下] = useState([])
    const [左下Data, set左下Data] = useState([])
    const [右下, set右下] = useState([])
    const [右下Data, set右下Data] = useState([])
    const [lowhf, setLowhf] = useState([])
    const [lowhfData, setLowhfData] = useState([])
    const [upphlf, setUpphlf] = useState([])
    const [upphlfData, setUpphlfData] = useState([])
    const [invert, setInvert] = useState([])
    const [invertData, setInvertData] = useState([])
    const ctm = JSON.parse(localStorage.getItem('ctm'));
    const TDSelected = ctm['TDSelected'];
    const nearestAMeasurement = ctm['nearestAMeasurement'];
    const project = JSON.parse(localStorage.getItem('persistProjectSelected'));
    const projectSelected = project['projectCode'];

    let ctmLocale = JSON.parse(localStorage.getItem('ctm'));
    let stationPoint = ctmLocale['station_point'];
    let supportPtn = ctmLocale['support_ptn'];

    const [state, setState] = React.useState({
        disp_lv1_pos: true,disp_lv1_pos_show: true,
        disp_lv1_neg: true,disp_lv1_neg_show: true,
        disp_lv2_pos: true,disp_lv2_pos_show: true,
        disp_lv2_neg: true,disp_lv2_neg_show: true,
        disp_lv3_pos: true,disp_lv3_pos_show: true,
        disp_lv3_neg: true,disp_lv3_neg_show: true,
        settle_lv1_pos: true,settle_lv1_pos_show: true,
        settle_lv1_neg: true,settle_lv1_neg_show: true,
        settle_lv2_pos: true,settle_lv2_pos_show: true,
        settle_lv2_neg: true,settle_lv2_neg_show: true,
        settle_lv3_pos: true,settle_lv3_pos_show: true,
        settle_lv3_neg: true,settle_lv3_neg_show: true,
        right: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        let removeFromThreshold = []
        let addToThreshold = []
console.log("event.target.name => ", event.target.name)
        if (event.target.checked === false){    // user uncheck, value remove from threshold array
            removeFromThreshold = threshold.filter(item => item.label.text !== event.target.name)
            //test filter by class name
            //removeFromThreshold = threshold.filter(item => item.getElementsByClassName.contains(event.target.name))
            
            console.log("removeFromThreshold => ", removeFromThreshold)
            

            setThreshold(removeFromThreshold)
            /*thresh && thresh.length && thresh.map((d) => { 
                d.name !== event.target.name &&
                    setThreshold(threshold => [...threshold, { 
                        y: d.value,
                        borderColor: '#00E396',
                        label: {
                            borderColor: '#00E396',
                            style: {
                                color: '#fff',
                                background: '#00E396'
                            },
                            text: d.name
                        }
                    }])
            })*/

        }else{                                 // user check, value add tp threshold array
            let nt = thresh.length && thresh.filter(item => item.name === event.target.name)
            console.log("t ================= ", nt)
            setThreshold(threshold => [...threshold, { 
                                                        y:  nt[0].value,
                                                        borderColor: nt[0].color,
                                                        label: {
                                                            borderColor: "transparent", //nt[0].color,
                                                            style: {
                                                                color: '#000',
                                                                background: "transparent", //nt[0].color
                                                            },
                                                            text: nt[0].name,
                                                            textAnchor: 'start',
                                                            position: 'left',
                                                            offsetX: -25,
                                                            offsetY: 0,
                                                        }
                                                     }
                                        ])
        }
        
    };

    useEffect(() => {
        var chart = new window.ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        return () => {
          chart.destory();
        };
    }, [])

    useEffect(()=>{
        console.log("threshold has been updated : ",threshold)
        setDisplayThresholdList(true)
    }, [threshold]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    function showEdit(name){
        console.log("edit value of ", name)
        setState({ ...state, [name+'_show']: false })
    }
    function saveNewValue(name){
        setDisplayThresholdList(false)
        console.log("edit value of ", name)
        var newValue = document.getElementById("value-"+name).value;
        setState({ ...state, [name+'_show']: true })
        dispatch(Actions.updateAMeasurementThreshold({name:name, value:newValue}))
        dispatch(Actions.aMeasurementThreshold())
    }
    
    const list = (anchor) => (
            <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            //onClick={toggleDrawer(anchor, false)}
            //onKeyDown={toggleDrawer(anchor, false)}
            >
               
                <div className={classes.firstTable}>
                    <div className={classes.tableDetails}>
                        <p>■管理基準値設定</p>
                        <p>管理基準値：内空変位</p>
                    </div>
                    <TableContainer>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>管理レベル</StyledTableCell>
                                <StyledTableCell align="right">上限/下限</StyledTableCell>
                                <StyledTableCell align="right">変位量（mm)</StyledTableCell>
                                <StyledTableCell align="right">表示/非表示</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {thresh && thresh.slice(0, 6).map((tr,i) => {
                                    return(
                                        <StyledTableRow key={`disp-${tr.name}`}>
                                            <StyledTableCell component="th" scope="row">{i === 0 && "LV.1"} {i === 2 && "LV.2"} {i === 4 && "LV.3"}</StyledTableCell>
                                            <StyledTableCell align="right">{tr.value > 0 ? "(+)" : "(-)"}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {state[tr.name+'_show'] === true ?  
                                                    <div>{tr.value} <GrEdit className={classes.edit} onClick={() => showEdit(tr.name)} /> </div>
                                                    :
                                                    <div className={classes.editInput}>
                                                        <TextField
                                                            id={`value-${tr.name}`}
                                                            label="Number"
                                                            type="number"
                                                            defaultValue={tr.value}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        /> 
                                                        <GrSave className={classes.save} onClick={() => saveNewValue(tr.name)} /> </div>
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                        checked={state[tr.name]}
                                                        onChange={handleChange}
                                                        name={tr.name}
                                                        color="primary"
                                                    />
                                                    }
                                                    label=""
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className={classes.secondTable}>
                    <div className={classes.tableDetails}>
                        <p>管理基準値：沈下</p>
                    </div>
                    <TableContainer>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>管理レベル</StyledTableCell>
                                <StyledTableCell align="right">上限/下限</StyledTableCell>
                                <StyledTableCell align="right">沈下量（mm)</StyledTableCell>
                                <StyledTableCell align="right">表示/非表示</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {thresh && thresh.slice(6, 12).map((tr,i) => {
                                    return(
                                        <StyledTableRow key={`settle-${tr.name}`}>
                                            <StyledTableCell component="th" scope="row">{i === 0 && "LV.1"} {i === 2 && "LV.2"} {i === 4 && "LV.3"}</StyledTableCell>
                                            <StyledTableCell align="right">{tr.value > 0 ? "(+)" : "(-)"}</StyledTableCell>
                                            <StyledTableCell align="right">{tr.value}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                        checked={state[tr.name]}
                                                        onChange={handleChange}
                                                        name={tr.name}
                                                        color="primary"
                                                    />
                                                    }
                                                    label=""
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                
            
            </div>
            
            
        );

    const [options, setOptions] = useState({
        series: fullData,
        options: {
            /*fill: { 
                type: 'image', 
                opacity: 1, 
                image: { 
                    src: ['assets/shape/triangle.svg','assets/shape/triangle.svg','assets/shape/triangle.svg','assets/shape/triangle.svg','assets/shape/triangle.svg','assets/shape/triangle.svg','assets/shape/triangle.svg','assets/shape/triangle.svg','assets/shape/triangle.svg'], 
                    width: 10, 
                    height: 10 
                } 
            },*/
            annotations: {
                position: 'front' ,
                yaxis: threshold,
            },
            markers: {
                size: [3, 3, 3, 3, 3, 3, 3, 3, 3, 0.5, 0.5, 0.5],
                colors: ['#ffffff', '#ffffff', '#5480ff', '#13cfff', '#ff0604', '#ff7111', '#ff9f13', '#ffd62a', '#ffbcde', '#000000', 'transparent', '#000000'],
                strokeColors: ['#4949a4', '#4545ff', '#5480ff', '#13cfff', '#ff0604', '#ff7111', '#ff9f13', '#ffd62a', '#ffbcde', '#000000', '#ffffff', '#000000'],
                strokeWidth: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
                strokeOpacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                strokeDashArray: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
                fillOpacity: [1, 1, 0 , 0 , 0 ,0 ,0 ,0 ,0 ,0],
                discrete: [],
                shape: ["circle","square","rect","rect","circle","square","rect","rect","circle",'rect',"rect","rect"],
                //shape: ["circle","square","triangle","diamond","circle","square","triangle","diamond","circle"],
                radius: 0,
                offsetX: 0,
                offsetY: 0,
                onClick: undefined,
                onDblClick: undefined,
                showNullDataPoints: true,
                hover: {
                  size: undefined,
                  sizeOffset: 3
                },
            },
            colors : ['#4949a4', '#4545ff', '#5480ff', '#13cfff', '#ff0604', '#ff7111', '#ff9f13', '#ffd62a', '#ffbcde', '#000000', '#000000', '#000000'],
            chart: {
                height: '100%',
                type: 'line',
                stacked: false,
                zoom: {
                    enabled: true,
                    type: 'xy'
                },
                toolbar: {
                    show: true,
                    tools:{
                      download:false
                    },
                    autoSelected: 'pan' 
                },
               
            },
            dataLabels: {
                enabled: false
            },    
            stroke: {
                width: [1, 1, 1]
            },
            title: {
                text: `TD: ${nearestAMeasurement} --- Project: ${projectSelected}`,
                align: 'left',
                offsetX: 110
            },
            xaxis: {
                //categories: xAxis,
                type: 'datetime'
            },
            yaxis: [
                {
                    showAlways: true,
                    seriesName: 'y',
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB'
                    },
                    labels: {
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "Y-1",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'y',
                    floating: true,
                    max : 20,
                    min : -140,
                    axisTicks: {
                        show: false,
                    },
                    
                    axisBorder: {
                        show: false,
                        color: '#008FFB'
                    },
                    labels: {
                        show: false,
                        style: {
                        colors: '#008FFB',
                        }
                    },
                    title: {
                        text: "",
                        style: {
                        color: '#008FFB',
                        }
                    },
                },
                {
                    seriesName: 'lowhf',
                    floating: false,
                    max : 280,
                    min : -20,
                    opposite: true,
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                        color: '#FEB019'
                    },
                    labels: {
                        show: false,
                        style: {
                            colors: '#FEB019',
                        },
                    },
                    title: {
                        text: "",
                        style: {
                            color: '#FEB019',
                        }
                    }
                },
                {
                    seriesName: 'upphlf',
                    floating: false,
                    max : 280,
                    min : -20,
                    opposite: true,
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                        color: '#FEB019'
                    },
                    labels: {
                        show: false,
                        style: {
                            colors: '#FEB019',
                        },
                    },
                    title: {
                        text: "",
                        style: {
                            color: '#FEB019',
                        }
                    }
                },
                {
                    seriesName: 'invert',
                    max : 280,
                    min : -20,
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019'
                    },
                    labels: {
                        show: true,
                        style: {
                            colors: '#FEB019',
                        },
                    },
                    title: {
                        text: "",
                        style: {
                            color: '#FEB019',
                        }
                    }
                },
            ],
            tooltip: {
                shared: true,
                intersect: false,
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                },
                y: {
                    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                      return value
                    }
                },
                onDatasetHover: {
                    highlightDataSeries: true,
                },
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 20,
                position:'right',
                width:150,
                formatter: function(seriesName, opts) {
                    console.log("shape : ", opts.w.config.markers.shape[opts.seriesIndex])
                    console.log("each legend : ", seriesName, opts) //opts.w.globals.series[opts.seriesIndex]
                    return seriesName + ' ' + getLegend(seriesName)
                },
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: undefined,
                    //radius: 12,
                    customHTML: function(x) {
                        return '<span className="custom-marker"><i className="fas fa-chart-pie"></i></span>'
                    },
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
            }
        },
      
      
    });

    function getLegend(name){
        if (name === "A") return '<div class="A"></div>'
        if (name === "B") return '<div class="B"></div>'
        if (name === "C") return '<div class="C"><div class="triangle"></div></div>'
        if (name === "D") return '<div class="D"></div>'
        if (name === "天端") return '<div class="天端"></div>'
        if (name === "左上") return '<div class="左上"></div>'
        if (name === "右上") return '<div class="右上"></div>'
        if (name === "左下") return '<div class="左下"></div>'
        if (name === "右下") return '<div class="右下"></div>'
        if (name === "lowhf") return '<div class="lowhf"></div>'
        if (name === "upphlf") return '<div class="upphlf"></div>'
        if (name === "invert") return '<div class="invert">--- . --- . --- .</div>'
    }
    
    /**************************************************************************/
    /********* Get an array with all threshold, name / value / color  *********/
    /**************************************************************************/
    useEffect(()=>{
        setThreshold([])
        thresh && thresh.length && thresh.map((d) => { 
            setThreshold(threshold => [...threshold, { 
                y: d.value,
                borderColor: d.color,
                opacity: 1,
                label: {
                    borderColor: "transparent", //d.color,
                    style: {
                        color: '#000',
                        background: "transparent", //d.color
                        cssClass: d.name,
                    },
                    text: d.name,
                    textAnchor: 'start',
                    position: 'left',
                    offsetX: -25,
                    offsetY: 0,
                }
            }])
        })
    }, [thresh]);

    useEffect(()=>{
        //sh.length && console.log("------------- A Measurement : settlementHistory -------------", sh)

        sh.map((d) => { 
           /* setA(A => [...A, {name: 'A', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.disp_a }]} ])
            setB(B => [...B, {name: 'B', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.disp_b }]} ])
            setC(C => [...C, {name: 'C', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.disp_c }]} ])
            setD(D => [...D, {name: 'D', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.disp_d }]} ])
            set天端(天端 => [...天端, {name: '天端', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.settle_1_top }]} ])
            set左上(左上 => [...左上, {name: '左上', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.settle_2_upleft }]} ])
            set右上(右上 => [...右上, {name: '右上', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.settle_3_upright }]} ])
            set左下(左下 => [...左下, {name: '左下', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.settle_4_lowleft }]} ])
            set右下(右下 => [...右下, {name: '右下', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y: d.settle_5_lowright }]} ])*/

            setA(A => [...A, { x: moment(d.date_time).format('MM/DD'), y: d.disp_a}])
            setB(B => [...B, { x: moment(d.date_time).format('MM/DD'), y: d.disp_b}])
            setC(C => [...C, { x: moment(d.date_time).format('MM/DD'), y: d.disp_c}])
            setD(D => [...D, { x: moment(d.date_time).format('MM/DD'), y: d.disp_d}])
            set天端(天端 => [...天端, { x: moment(d.date_time).format('MM/DD'), y: d.settle_1_top}])
            set左上(左上 => [...左上, { x: moment(d.date_time).format('MM/DD'), y: d.settle_2_upleft}])
            set右上(右上 => [...右上, { x: moment(d.date_time).format('MM/DD'), y: d.settle_3_upright}])
            set左下(左下 => [...左下, { x: moment(d.date_time).format('MM/DD'), y: d.settle_4_lowleft}])
            set右下(右下 => [...右下, { x: moment(d.date_time).format('MM/DD'), y: d.settle_5_lowright}])
        })
        
    }, [sh]);


    useEffect(()=>{
        A.length && setAData(AData => [...AData, {name: 'A', type: 'line', data: A} ])
    }, [A]);
    useEffect(()=>{
        B.length && setBData(BData => [...BData, {name: 'B', type: 'line', data: B} ])
    }, [B]);
    useEffect(()=>{
        C.length && setCData(CData => [...CData, {name: 'C', type: 'line', data: C} ])
    }, [C]);
    useEffect(()=>{
        D.length && setDData(DData => [...DData, {name: 'D', type: 'line', data: D} ])
    }, [D]);
    useEffect(()=>{
        天端.length && set天端Data(天端Data => [...天端Data, {name: '天端', type: 'line', data: 天端} ])
    }, [天端]);
    useEffect(()=>{
        左上.length && set左上Data(左上Data => [...左上Data, {name: '左上', type: 'line', data: 左上} ])
    }, [左上]);
    useEffect(()=>{
        右上.length && set右上Data(右上Data => [...右上Data, {name: '右上', type: 'line', data: 右上} ])
    }, [右上]);
    useEffect(()=>{
        左下.length && set左下Data(左下Data => [...左下Data, {name: '左下', type: 'line', data: 左下} ])
    }, [左下]);
    useEffect(()=>{
        右下.length && set右下Data(右下Data => [...右下Data, {name: '右下', type: 'line', data: 右下} ])
    }, [右下]);
                
    useEffect(()=>{
        //dfct.length && console.log("------------- A Measurement : distanceFromCrossTunnel -------------", dfct)
        dfct.length && dfct.map((d) => {

            setDateX(dateX => [...dateX, moment(d.date_time).format('MM/DD')])
            /*setLowhf(lowhf => [...lowhf, {name: 'lowhf', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y2: d.dist_to_face_lowhf }]} ])
            setUpphlf(upphlf => [...upphlf, {name: 'upphlf', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y2: d.dist_to_face_upphlf }]} ])
            setInvert(invert => [...invert, {name: 'invert', type: 'line', data: [{ x: moment(d.date_time).format('MM/DD'), y2: d.dist_to_invert }]} ])*/

            setLowhf(lowhf => [...lowhf, { x: moment(d.measmt_date_time).format('MM/DD'), y: d.dist_to_face_lowhf}])
            setUpphlf(upphlf => [...upphlf, { x: moment(d.measmt_date_time).format('MM/DD'), y: d.dist_to_face_upphlf}])
            setInvert(invert => [...invert, { x: moment(d.measmt_date_time).format('MM/DD'), y: d.dist_to_invert}])
        })
        
    }, [dfct]);

    
    useEffect(()=>{
        lowhf.length && setLowhfData(lowhfData => [...lowhfData, {name: 'lowhf', type: 'line', data: lowhf} ])
    }, [lowhf]);
    useEffect(()=>{
        upphlf.length && setUpphlfData(upphlfData => [...upphlfData, {name: 'upphlf', type: 'line', data: upphlf} ])
    }, [upphlf]);
    useEffect(()=>{
        invert.length && setInvertData(invertData => [...invertData, {name: 'invert', type: 'line', data: invert} ])
    }, [invert]);
    



    useEffect(()=>{
        AData.length && setFullData(fullData => [...fullData, AData[0]])
    }, [AData]);
    useEffect(()=>{
        BData.length && setFullData(fullData => [...fullData, BData[0]])
    }, [BData]);
    useEffect(()=>{
        CData.length && setFullData(fullData => [...fullData, CData[0]])
    }, [CData]);
    useEffect(()=>{
        console.log("add DData : ")
        DData.length && setFullData(fullData => [...fullData, DData[0]])
    }, [DData]);
    useEffect(()=>{
        天端Data.length && setFullData(fullData => [...fullData, 天端Data[0]])
    }, [天端Data]);
    useEffect(()=>{
        左上Data.length && setFullData(fullData => [...fullData, 左上Data[0]])
    }, [左上Data]);
    useEffect(()=>{
        右上Data.length && setFullData(fullData => [...fullData, 右上Data[0]])
    }, [右上Data]);
    useEffect(()=>{
        左下Data.length && setFullData(fullData => [...fullData, 左下Data[0]])
    }, [左下Data]);
    useEffect(()=>{
        console.log("add 右下Data : ")
        右下Data.length && setFullData(fullData => [...fullData, 右下Data[0]])
    }, [右下Data]);


    useEffect(()=>{
        console.log("full Data: ", fullData)
    }, [fullData]);

    useEffect(()=>{
        console.log("add lowhfData : ")
        右下Data.length && lowhfData.length && setFullData(fullData => [...fullData, lowhfData[0]])
    }, [lowhfData, 右下Data]);
    useEffect(()=>{
        console.log("add upphlfData : ")
        右下Data.length && upphlfData.length && setFullData(fullData => [...fullData, upphlfData[0]])
    }, [upphlfData, 右下Data]);
    useEffect(()=>{
        console.log("add invertData : ")
        右下Data.length && invertData.length && setFullData(fullData => [...fullData, invertData[0]])
    }, [invertData, 右下Data]);

      return (
        <>
        
            <div className="col-start-1 col-end-10">      
            {/*<ReactApexChart id='apex' options={chartData.options} series={chartData.series} height={750} />*/}
            <div id="chart" className="app" key={1}></div>
            </div>

            <div className="col-start-10 col-end-13"> 
            
                <Grid container >
                    <p className={classes.title}>{t('cross_section_name')}</p>
                    <p className={classes.infosRight}>{stationPoint} ({supportPtn})</p>
                    <p className={classes.infosRight}>(TD:{nearestAMeasurement})</p>

                    <p className={classes.title}>{t('measurement_positions')}</p>
                    <img className={classes.tunnelImg} src="assets/images/tunnel.png" />


                    <p className={classes.infosRB}>{t('construction_project_name')} : Construction project name</p>
                    <p className={classes.infosRB}>{t('drawing_name')} : Drawing name</p>
                    <p className={classes.infosRB}>{t('date_of_creation')} : Date creation</p>
                    <p className={classes.infosRB}>{t('station_name')} : {stationPoint}</p>
                    <p className={classes.infosRB}>{t('constructor')} : Constructor</p>
                    <p className={classes.infosRB}>{t('client')} : Client</p>

                    <div>
                        {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                            <Button onClick={toggleDrawer(anchor, true)} className={classes.threshold}>Threshold</Button>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                onOpen={toggleDrawer(anchor, true)}
                            >
                                {list(anchor)}
                            </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                    </div>
                </Grid>
            </div>
            
        </>

      )
}

export default ApexChart