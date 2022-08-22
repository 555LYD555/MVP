<template>
  <!-- 高德地图用AMapUI版本 -->
  <div class="myContainer">
    <div class="mapAndSearch">
      <!-- 地图主体 -->

      <div id="container">
      </div>
      <div id="pickerBox">
        <input id="pickerInput"
               placeholder="输入关键字选取地点" />
        <div id="pointInfo"></div>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;margin:30px;flex-flow:wrap;">
      
     
          <el-button type="primary"
                     icon="el-icon-refresh-right"
                     @click="startAnimation()"
                     >重新播放</el-button>
       
          <el-button type="warning"
                     icon="el-icon-video-pause"
                     @click="pauseAnimation()"
                     v-if="isPlay">暂停播放</el-button>
        
          <el-button type="primary"
                     icon="el-icon-video-play"
                     @click="resumeAnimation()"
                     v-if="!isPlay">继续播放</el-button>
          
          
          <el-select v-model="selectSpeed"
                     placeholder="1倍速"
                     @change="changeSpeed()">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        
          <el-select v-model="isLoopValue"
                     placeholder="播放设置"
                     @change="loopChange()">
            <el-option key="0"
                       label="单次播放"
                       value="0">
            </el-option>
            <el-option key="1"
                       label="自动连播"
                       value="1">
            </el-option>
          </el-select>
       
          <div style="display:flex;align-items:center;">
            <span>实时路程：</span>
            <el-input v-model="navg1Distance" style="width:65%;"></el-input>
            <span>&nbsp;km</span>
          </div>

       
    </div>
 
      <el-row style="padding:15px 30px;display:flex;align-items:center;">
        <el-col :span="4"><span>时间（节点）滑块</span></el-col>
        <el-col :span="20">
          <el-slider v-model="timeSlide"
                     :step="timeSliderSteps"
                     @change="slideTimeChange()">
          </el-slider>
        </el-col>

      </el-row>
   
  
      <el-row style="padding:15px 30px;display:flex;align-items:center;">
        <el-col :span="4"><span>速度滑块</span></el-col>
        <el-col :span="20">
          <el-slider v-model="speedSlide"
                     :step="speedSliderSteps"
                     :max="5000000"
                     @change="slideSpeedChange()">
          </el-slider>
        </el-col>

      </el-row>
  

  </div>
  <!-- </el-dialog> -->
</template>



<script>
// import AMapLoader from '@amap/amap-jsapi-loader';
// import AMapLoader from '@amap/amap-jsapi-loader';
import AMap from 'AMap';
import AMapUI from 'AMapUI';


export default {
  naem: 'GaoDeMap',

  data () {
    return {
      //  弹框开关
      // detailOpened: true,
      map: null,
      marker: null,
      // 轨迹路径实体
      pathSimplifierIns: null,
      // 巡航器实体
      navg1: null,
      // 轨迹路径坐标
      // lineArr: [[115.979531, 28.692667], [115.975156, 28.698881], [115.974689, 28.689027]],
      //轨迹实体
      // polyline:null,
      options: [
        {
          value: '0.5',
          label: '0.5倍速'
        }, {
          value: '1',
          label: '1倍速'
        }, {
          value: '1.5',
          label: '1.5倍速'
        }, {
          value: '2',
          label: '2倍速'
        }],
      selectSpeed: null,
      // playSpeed: 3500,
      //时间滑块绑定值和步长
      timeSlide: 0,
      timeSliderSteps: 10,
      //速度滑块绑定值和步长
      speedSlide: 1000000,
      speedSliderSteps: 500000,
      //巡航器所在节点索引
      navg1Index: 0,
      // 轨迹是否循环播放
      isLoopValue: null,
      isLoop: false,
      //  巡航器当前行驶距离
      navg1Distance: 0,

      marks: {
        0: '0°C',
        8: '8°C',
        37: '37°C',
        50: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '50%')
        }
      },
      //动画是否已经开始播放,用于控制播放暂停按钮的显隐
      isPlay: true,
      // poi选点
      poiPicker: null,
    };
  },
  mounted () {
    this.createMap();
  },

  methods: {
    /**
     *   创建地图
     * */
    createMap () {
      this.map = new AMap.Map('container', { // container为容器的id
        zoom: 3, //初始化地图层级
        center: [115.979531, 28.692667] //初始化地图中心点
      });
      var that = this;

      // 引入地图控件
      AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
        that.map.addControl(new BasicControl.Zoom({
          position: 'lt',
          showZoomNum: true
        }))
        that.map.addControl(new BasicControl.LayerSwitcher({
          position: 'lb'
        }))
        // that.map.addControl(new BasicControl.Traffic({
        //   position: 'lb'
        // }))

      })

      // 引入POI搜索引擎
      AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
        that.poiPicker = new PoiPicker({
          input: 'pickerInput'

        })

        var marker = new AMap.Marker();
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        });

        //选取了某个POI
        that.poiPicker.on('poiPicked', function (poiResult) {
          console.log(poiResult.item)
          var source = poiResult.source,
            poi = poiResult.item,

            info = {
              source: source,
              id: poi.id,
              name: poi.name,
              location: poi.location.toString(),
              address: poi.address
            };

          marker.setMap(that.map);
          infoWindow.setMap(that.map);

          marker.setPosition(poi.location);
          infoWindow.setPosition(poi.location);

          infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>');
          infoWindow.open(that.map, marker.getPosition());

          that.map.setCenter(marker.getPosition());
        });

        that.poiPicker.onCityReady(function () {
          that.poiPicker.suggest('中核科技园');
        });
      })




      // 引入巡航器
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }
        that.pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          //autoSetFitView:false,
          map: that.map, //所属的地图实例

          getPath: function (pathData, pathIndex) {
            return pathData.path;
          },
          getHoverTitle: function (pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              //point 
              return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
            }
            return pathData.name + '，点数量' + pathData.path.length;
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
          }
        });
        console.log(that.pathSimplifierIns)

        //设置数据
        that.pathSimplifierIns.setData([{
          name: '路线0',
          path: [
            [116.405289, 39.904987],
            [113.964458, 40.54664],
            [111.47836, 41.135964],
            [108.949297, 41.670904],
            [106.380111, 42.149509],
            [103.774185, 42.56996],
            [101.135432, 42.930601],
            [98.46826, 43.229964],
            [95.777529, 43.466798],
            [93.068486, 43.64009],
            // [90.34669, 43.749086],
            [87.61792, 43.793308]
          ],
          // [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]]
        }]);

        //对第一条线路（即索引 0）创建一个巡航器
        that.navg1 = that.pathSimplifierIns.createPathNavigator(0, {
          loop: that.isLoop, //循环播放
          speed: 1000000 //巡航速度，单位千米/小时
        });
        console.log(that.navg1)

        that.navg1.start();

        console.log(that.navg1.getCursor().idx)

        that.navg1Index = that.navg1.getCursor().idx;
        that.navg1.on('move', function (e) {
          that.navg1Distance = that.navg1.getMovedDistance()

          if (that.navg1.getCursor().idx == that.navg1.getPathEndIdx()) {  //到达最后一个节点，巡航器状态置为stop
            // that.navg1.stop();
            that.timeSlide += that.timeSliderSteps;
            console.log(that.navg1Index)
            console.log("到终点了！")
            that.navg1Index = 0;
            // that.timeSlide = 0;
            // return;
          }
          if (that.navg1.getCursor().idx == that.navg1Index + 1) {   //巡航器到达了下一个节点
            that.navg1Index++;
            that.timeSlide += that.timeSliderSteps;    //让时间滑动条也到下一个节点
            console.log(that.navg1Index)
            console.log("okkk")
          }
        })
        console.log(that.navg1.getNaviStatus())
        that.navg1.on('stop', function (e) {
          // 巡航器到达终点，state为stop，重置时间滑动条
          console.log("停止了")
        })
      })
    },

    //开始巡航
    startAnimation () {
      this.navg1.start(0)
      this.isPlay = true;
      this.timeSlide = 0;
      this.navg1Index = 0;

    },
    //暂停巡航
    pauseAnimation () {
      this.navg1.pause();
      this.isPlay = !this.isPlay;
    },
    //恢复巡航
    resumeAnimation () {
      this.navg1.resume();
      this.isPlay = !this.isPlay;
    },
    //停止巡航
    stopAnimation () {
      this.navg1.stop();
    },

    //mytest
    test () {
      console.log(this.navg1.getSpeed())
      //当前巡航器所属索引位置和比例
      console.log(this.navg1.getCursor())
      //巡航器状态
      console.log(this.navg1.getNaviStatus())
      //当前巡航器地理坐标
      console.log(this.navg1.getPosition())
      //当前巡航器速度(设定的速度)
      console.log(this.navg1.getSpeed())
      // this.navg1.setSpeed(5000000)
      // console.log(this.navg1.getSpeed())
      //经过的巡航路径距离（起始点到当前位置,直线？或者路径长度？）
      console.log(this.navg1.getMovedDistance())
    },

    //滑块实现速度调节
    changeSpeed () {
      if (this.selectSpeed == 0.5) {
        this.navg1.setSpeed(this.speedSlide / 2)
      } else if (this.selectSpeed == 1) {
        this.navg1.setSpeed(this.speedSlide)
      } else if (this.selectSpeed == 1.5) {
        this.navg1.setSpeed(this.speedSlide * 1.5)
      } else {
        this.navg1.setSpeed(this.speedSlide * 2)
      }
    },


    slideSpeedChange () {
      console.log(this.speedSlide)
      this.navg1.setSpeed(this.speedSlide)
    },
    // 滑块实现时间调节
    slideTimeChange () {
      // 当前时间点位于第几个间断点
      //当前时间点/间隔时间
      var index = this.timeSlide / this.timeSliderSteps
      console.log(index)

      //让巡航器跳到对应index的节点开始巡航
      // this.navg1.start()
      // this.navg1.moveToPoint(index, 0)
      // this.navg1Index = index;
      // this.navg1.resume()


      //如果当前轨迹播放是暂停状态，那么拉条以后，轨迹依然是暂停状态
      if (!this.isPlay) {
        this.navg1.moveToPoint(index, 0);
        this.navg1Index = index;
        this.navg1.pause();
      } else {
        this.navg1.moveToPoint(index, 0)
        this.navg1Index = index;
        this.navg1.resume()
      }


      //获取当前导航条
      // 获取当前导航器的位置（第几个索引点，什么比例）
      // this.navg1.getCursor();
    },


    //改变播放设置：切换为循环播放或者单次播放
    loopChange () {
      this.isLoopValue == 1 ? (this.isLoop = true) : (this.isLoop = false);
      console.log(this.isLoop);
    },




    //使用高德地图提供的on监听事件，实现巡航器移动状态时，每到达一次节点的监听
    timeChange () {
      console.log(this.navg1.getCursor())
      // var index = this.navg1.getCursor();
      console.log(index)
      this.navg1.on('move', function (e) {
        if (this.navg1.getCursor().idx = index + 1) {   //巡航器到达了下一个节点
          index++;
          this.timeSlide += this.timeSliderSteps;
          console.log("okkk")
        }
      })
    }

  },

  
}

</script>

<style scoped lang="scss">
.mapAndSearch {
  width: 99%;
  height: 100%;
  display: flex;
  margin:2px 0 0 4px;

  box-shadow: 10px 10px 10px grey;
}

#container {
  width: 80%;
  height: 580px;
}
.outContainer {
  display: flex;
  z-index: -100;
  width: 100%;
  border: 6px solid;
  border-image: linear-gradient(45deg, gold, deeppink) 1;
  animation: huerotate 16s infinite linear;
  filter: hue-rotate(360deg);
}
@keyframes huerotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

#pickerBox {
  width: 20%;
  // border: 1px solid gray;
}
#pickerInput {
  width: 97%;
  height: 40px;
}
#pointInfo{
  height:58%;
}

.mybuttons {
  margin-top: 30px;
}
/deep/ .amap-ui-poi-picker-sugg-container{
  height:58%;

}
</style>