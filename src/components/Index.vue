<template>
    <div class="container page">
      <img src="../assets/img/ybt_banner.png">
      <img class="line" src="../assets/img/dashed_line.png">
      <p>　　常青树，是华夏保险推出的产品性价比市场领先的终身型重大疾病保险；医保通，是华夏保险推出的“低保费、高保障”的医疗险。</p>
      <p>　　华夏常青树+医保通，是最体现客户利益至上的重疾险组合，为客户提供最好的家庭健康防护网。</p>
      <div class="con">
        <img src="../assets/img/feature1.png">
      </div>
      <p>　　住院医疗全面覆盖：门急诊给付，住院前后全程呵护；社保内外费用可以给付，包括：手术费、药品费、膳食费、材料费、护理费等等。年度最高给付额度200万，累计给付额度500万。续保无忧。</p>
      <div class="con">
        <img src="../assets/img/feature2.png">
      </div>
      <p>　　不分性别，费率低廉，如30岁308元/年，40岁385元/年。</p>
      <img src="../assets/img/banner1.png">





      <yd-tab horizontal-scroll :callback='evn'>
        <yd-tab-panel label="有长险保单">

          <div :class="['table',{'greenBg':index%2!=0}]" v-for="(item,index) in hasChit.applicants">
            <h1>
              <b></b>
              <span class="name">{{'投保人：'+item.custname}}</span>
              <span class="phone"><i></i><a :href="'tel:'+item.phone">{{item.phone}}</a></span>
              <span class="more" @click="toMore(item)">更多</span>
            </h1>
            <div class="tbody" v-for="(val,i) in item.insured">
              <h2>
                <span class="lf">{{'被保人：'+val.insuredname}}</span>
                <span class="rt"><i></i>{{'是投保人的：'+val.relationship}}</span>
              </h2>
              <ul>
                <li class="title">
                  <span>险种名称</span>
                  <span>基本保额</span>
                  <span>年交保费</span>
                  <span>交费期间</span>
                </li>
                <li v-for="(con,key) in val.insurances">
                  <span>{{con.productname}}</span>
                  <span>{{con.basesumins}}</span>
                  <span>{{con.annfee}}</span>
                  <span>{{con.premperiod+'年'}}</span>
                </li>
              </ul>
                
            </div>
          </div>

        </yd-tab-panel>
        <yd-tab-panel label="无长险保单">

          <div :class="['table2',{'greenBg':index%2!=0}]" v-for="(item,index) in noChit.applicants">
            <h1>
              <b></b>
              <span class="name">{{'投保人：'+item.custname}}</span>
              <span class="phone"><i></i><a :href="'tel:'+item.phone">{{item.phone}}</a></span>
              <span class="more" @click="toMore(item)">更多</span>
            </h1>
            <div class="tbody" v-for="(val,i) in item.insured">
              <h2>
                <span class="lf">{{'被保人：'+val.insuredname}}</span>
                <span class="rt"><i></i>{{'是投保人的：'+val.relationship}}</span>
              </h2>
              <ul>
                <li v-for="(con,key) in val.insurances">
                  {{con.productname}}
                </li>
              </ul>
            </div>
          </div>
          

        </yd-tab-panel>
        <yd-tab-panel label="已达到标准">
          
          <div :class="['table',{'greenBg':index%2!=0}]" v-for="(item,index) in upToStandard.applicants">
            <h1>
              <b></b>
              <span class="name">{{'投保人：'+item.custname}}</span>
              <span class="phone"><i></i><a :href="'tel:'+item.phone">{{item.phone}}</a></span>
              <span class="more" @click="toMore(item)">更多</span>
            </h1>
            <div class="tbody" v-for="(val,i) in item.insured">
              <h2>
                <span class="lf">{{'被保人：'+val.insuredname}}</span>
                <span class="rt"><i></i>{{'是投保人的：'+val.relationship}}</span>
              </h2>
              <ul>
                <li class="title">
                  <span>险种名称</span>
                  <span>基本保额</span>
                  <span>年交保费</span>
                  <span>交费期间</span>
                </li>
                <li v-for="(con,key) in val.insurances">
                  <span>{{con.productname}}</span>
                  <span>{{con.basesumins}}</span>
                  <span>{{con.annfee}}</span>
                  <span>{{con.premperiod+'年'}}</span>
                </li>
              </ul>
                
            </div>
          </div>




        </yd-tab-panel>
    </yd-tab>

      


    <p class="pop" @touchstart="guide=true">温馨<br/>提示</p>



      
      <div class="suppStyle">本活动最终解释权归华夏保险所有</div>
      <transition name="fade">
        <div class="guide_mask" v-show="guide">
          <div class="bgBorder">
            <span  @touchstart="guide=false"></span>
            <div class="word">
              <p><b>有长险保单：</b>指客户有常青树或福临门系列产品，但未达到医保通投保标准； </p>
              <p><b>无长险保单：</b>指客户没有常青树或福临门系列产品；</p>
              <p><b>已达到标准：</b>指客户满足医保通投保标准，直接投保即可。</p>
            </div>
            
          </div>
        </div>
      </transition>
    </div>
  
</template>
<script>

export default {
    name: 'index',
    data(){
      return {
        guide:false,
        hasChit:{},
        noChit:{},
        upToStandard:{},
        // userid:''
      }
    },
    computed:{
      userid(){
        return rq().userid;
      }
    },
    mounted(){
      common.noShare();
      this.tabClick(2);
    },
    methods:{
      toMore(item){
        window.location.href='https://sales.ihxlife.com/wxtb2017/client_management/client_detail.html?client_no='+item.custid+'&userid='+this.userid;
        //window.location.href='https://sales-int.ihxlife.com/wxtb2017/client_management/client_detail.html?client_no='+item.custid+'&userid='+this.userid;
      },
      evn(lable,key){//判断来源 业务员OR客户
        let n = key+1;
        //已达标 1
        //有长险 2
        //无长险 3
        n==3?this.tabClick(1):n==2?this.tabClick(3):this.tabClick(2);
      },
      tabClick(n){
        ax('getMedicalInsuranc.do',{'userid':this.userid,'custType':n}).then((res)=>{
          n==2?this.hasChit=res.body:
          n==3?this.noChit=res.body:
          this.upToStandard=res.body
        });
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
.page{z-index:0;}
div.container{
  padding-bottom: 7em;min-height:190vh;
  img{
    display:block;width: 100%;
    &.line{
      margin-bottom:.5rem;
      &.narrow{
        margin-bottom:.3rem;
      }
     }
    &.higher{
      // height:2rem;
      margin-bottom:.5rem;
      width:90%;
      margin-left:5%;
    }
  }
  p{
    color:@deepRed;font-size:1rem;margin-bottom:.5rem;padding: 0 1rem;
    &.brown{
      color:#4f4f4f;
    }
  }

  .con{
    position:relative;text-align:center;margin:.8rem 0;
    img{
     width:60%;display:inline-block;
     &.small{
      width:45%;
     }
    }
  }

  span.crossline{
    display:block;height:.5rem;background:@lightGreen;
  }
  div.intro{
    // height:14rem;background:url('../assets/img/introborder.png') no-repeat center center ;background-size:100%;padding-top: 11%;
    p{
      font-size:.8rem;padding: 0 1.5rem;margin-bottom:.2rem;
    }
  }
  div.suppStyle{
    height:3em;background: @deepRed;text-align:center;color:#fff;line-height:3;position:absolute;bottom:0;width:100%;
  }
  
  div.table{
    padding:7% 5% 5%;
    &.greenBg{
      background:@lightG2;
    }
    h1{
      font-size:1.3em;color:@deepRed;font-weight:bold;position:relative;
      span{
        display:inline-block;
        &.name{
          width:38%;
        }
        &.phone{
          // width:20%;
          position:relative;padding-left: 1.5rem;
          i{
            position:absolute;left:0rem;top:0;width:1.5em;height:1.5em;background:url('../assets/img/phone.png') no-repeat center center; background-size: 100%;vertical-align:bottom;
          }
        }
        &.more{
          // width:10%;
          position:absolute;top:0;right: 0;padding:.2em .3em;border: 1px solid @deepRed;border-radius:5px;font-weight:normal;font-size:.9em;
        }
      }
      
    }
    b{
      position:absolute;left:-5.4%;top:0;background:@deepRed;width:.4em;height:100%;
    }
    div.tbody{
      margin-top: 1rem;border:1px solid @deepRed;border-radius:5px;padding-bottom:1rem;
      h2{
          height:2rem;line-height: 2;font-size:1.3em;margin:1rem .5rem;color:@deepRed;
      }
      ul{
        li{
          // height:2rem;line-height:2;
          
          border:1px solid #eee;border-top:none;
          width:90%;margin-left:5%;
          &.title{
            background:@lightG;border:1px solid #eee;
          }
          span{
            display:inline-block;width:23%;padding:.6rem 0;text-align:center;vertical-align:middle;
          }
        }
      }
      
    }
  }
  div.table2{
    padding:7% 5% 5%;
    &.greenBg{
      background:@lightG2;
    }
    h1{
      font-size:1.3em;color:@deepRed;font-weight:bold;position:relative;
      span{
        display:inline-block;
        &.name{
          width:38%;
        }
        &.phone{
          // width:20%;
          position:relative;padding-left: 1.5rem;
          i{
            position:absolute;left:0rem;top:0;width:1.5em;height:1.5em;background:url('../assets/img/phone.png') no-repeat center center; background-size: 100%;vertical-align:bottom;
          }
        }
        &.more{
          // width:10%;
          position:absolute;top:0;right: 0;padding:.2em .3em;border: 1px solid @deepRed;border-radius:5px;font-weight:normal;font-size:.9em;
        }
      }
      
    }
      b{
        position:absolute;left:-5.4%;top:0;background:@deepRed;width:.4em;height:100%;
      }
    div.tbody{
      margin-top: 1rem;border:1px solid @deepRed;border-radius:5px;padding-bottom:1rem;
      h2{
          height:2rem;line-height: 2;font-size:1.3em;margin:.3rem 5%;color:@deepRed;font-weight:bold;
      }
      ul{
        // border:1px solid #eee;
        li{
          // height:2rem;line-height:2;
          width:90%;margin-left:5%;margin:.3rem 5%;color:@deepRed;
          // &.title{
          //   background:@lightG;
          // }
          // span{
          //   display:inline-block;width:24%;padding:.6rem 0;text-align:center;vertical-align:middle;
          // }
        }
      }
      
    }
  }
  .rt{
    float:right;
  }
  .lf{
    float:left;
  }
  .pop{
    position:fixed;top:50%;right:0;background:#f4b13e;color:#fff;width:4rem;height:4rem;padding-top:.65rem;border-radius:50%;text-align:center;;
  }
  .guide_mask{
    position:fixed;z-index:1100;top:0;left:0;background:rgba(0,0,0,.7);width:100%;height:100%;
    .bgBorder{
      position:absolute;top:50%;left:0;transform:translateY(-50%);background:url('../assets/img/popBg.png') no-repeat center center;background-size:100%;height:40%;width:100%;
      .word{
        position:absolute;top:50%;left:50%;transform:translate(-40%,-34%);width:70%;
      }
      p{
        font-size:1em;
      }
      span{
        position:absolute;top:16%;right:12%;width:4em;height:4em;
      }
    }
  }
}


</style>
