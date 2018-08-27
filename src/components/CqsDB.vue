<template>
    <div class="container page">
      <div class="block1">
        <img src="../assets/img/db/jb_banner.png">
        <img src="../assets/img/db/jb_intro1.png">
        <img src="../assets/img/db/jb_intro2.png">
      </div>
      <!-- 投保人信息展示区域 -->
      <div :class='["content",{"act":shade_show}]'>
        <div class="hide" v-show="shade_show" @click="step+=1">
          <ul class="info fake">
            <li>
              <p><span class="green">险种计划：常青树（多倍版）</span><b class="green"><span :class="['in',{'highLight1':step==3}]">20年交</span>/年交<span :class="['in',{'highLight1':step==4}]">保费5000元</span></b></p>
              <p><a v-show="step==5">分享计划书</a></p>
            </li>
          </ul>
          <div class="step1" v-show="step==1"></div>
          <div class="step2" v-show="step==2"></div>
          <div class="step3" v-show="step==3"></div>
          <div class="step4" v-show="step==5"></div>
          <div class="step5" v-show="step==4"></div>
        </div>
        <div class="tree"></div>
        <div class="table" v-for="(item,i) in customertLis">
          <h1>
            <!-- <b></b> -->
            <span class="name">{{'投保人：'+item.applyName}}</span>
            <span class="phone"><i></i><a :href="'tel:'+item.applyPhone">{{item.applyPhone}}</a></span>
            <span class="more" @click="toMore(item)">详情</span>
          </h1>
          <ul class="info">
            <li v-for="(val,is) in item.insuredLis">
              <p><span>被保人：{{val.insureName}}</span><b>投被保人关系：{{val.insuredRelationship}}</b><i @click="eyeSwitch($event,val.remainingAmount,val,item)"></i></p>
              <p><span  :class="[{'highLight1':i==0&&step==1&&shade_show}]">推荐指数：<yd-cell-item class="star"><yd-rate slot="left" size=".9rem" color="#fff" active-color="#ffd04f" v-model="val.recommendedIndex" :readonly="true"></yd-rate></yd-cell-item></span><b class="yellow" :class="[{'highLight1':i==0&&step==2}]">剩余保额：******万元</b></p>
              <p style="display:none;"><span class="green">险种计划：常青树（多倍版）</span><b class="green">/年交保费元</b></p>
              <p style="display:none;"><a href="">分享计划书</a></p>
            </li>
          </ul>
        </div>
      </div>




      <!-- <div class="suppStyle">本活动最终解释权归华夏保险所有</div> -->
    </div>

</template>
<script>

export default {
    name: 'index',
    data(){
      return {
        // userid:''
        customertLis:[],
        step:1,
        shade_show:false,
      }
    },
    watch:{
      step(val){
        val==6?this.shade_show=false:'';
      }
    },
    computed:{
      userid(){
        return rq().userid;
      }
    },
    mounted(){
      common.noShare();
      this.getInfo();
    },
    methods:{
      getInfo(){
        ax('queryCustomers.do',{'userid':this.userid}).then((res)=>{
          // console.log(res)
          this.customertLis=[...res.customertLis];
          this.customertLis.length>0?this.fake():'';
          
          // this.shade_show = true;
        });
      },
      toMore(item){
        window.location.href='https://sales.ihxlife.com/wxtb2017/client_management/client_detail.html?client_no='+item.applicantNo+'&userid='+this.userid;
      },
      //判断有无遮罩
      fake(){
        ax('recodeMsg.do',{'userid':this.userid,'cn':1}).then(res=>{
          // console.log(res);
          // this.shade_show = true;
          res.status=='N'?'':this.shade_show=true;
        })
      },
      eyeSwitch(e,val,insurInfo,appInfo){
        // console.log(1)
        // console.log(e.target)
        if(e.target.className==''){
          // console.log(2)

          if(this.$store.state.detailList[insurInfo.insuredNo]){
            e.target.className="active";
            $(e.target.parentNode).next().find('b').html('剩余保额：'+val+'万元');

            $(e.target.parentNode).next().next().show();
            $(e.target.parentNode).next().next().next().show();
            return;
          }


          e.target.className="active";
          $(e.target.parentNode).next().find('b').html('剩余保额：'+val+'万元'); 

          let para = {
            insuredNo:insurInfo.insuredNo,
            apply : {
              "apply_birthday":appInfo.apply_birthday.split(' ')[0],
              "apply_gender":appInfo.apply_gender,
              "apply_name":appInfo.applyName
            },
            insured_list:[
                  {
                    "amount_insured":Math.round(insurInfo.remainingAmount*10000*100)/100,
                    "insured_birthday":insurInfo.insuredBirthday.split(' ')[0],
                    "insured_gender":insurInfo.insuredSex,
                    "insured_name":insurInfo.insureName
                  }
            ],
            agentCode:this.userid
          }

          ax('getJhsInfo.do',{data:JSON.stringify(para)},true).then(res=>{
            // console.log(res.insureds[0])
            if(res.result=='succ'){
              // e.target.className="active";
              // $(e.target.parentNode).next().find('b').html('剩余保额：'+val+'万元');
              
              this.$store.commit('addMember',insurInfo.insuredNo);
              $(e.target.parentNode).next().next().show().find('b.green').html(res.insureds[0].payYear+'年交/年交保费'+res.insureds[0].prem+'元');
              $(e.target.parentNode).next().next().next().show().find('a').attr('href',res.linkUrl);
            }else{
              popalert.fade('获取计划书失败')
            }
            
          })



        }else{
          // console.log(3)
          e.target.className="";
          $(e.path[1]).next().find('b').html('剩余保额：******万元')
          $(e.path[1]).next().next().hide();
          $(e.path[1]).next().next().next().hide();
        }
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
@bgColor:#dff4ed;
div.container{
  background: @bgColor;min-height: 100vh;
  div.block1{
    // background-color: #fff;
    img{
      width: 100%;
      &:last-child{
        margin-bottom: 2em;
      }
      
    }
  }

  div.content{

    position:relative;
    margin-top:3em;
    &.act{
      height:100vh;overflow: hidden;
    }


    div.hide{
      position:absolute;width:100%;height:100%;background: rgba(0,0,0,.7);z-index:100;
      div.step1{
        position:absolute;
        width:80%;height:20em;
        background:url('../assets/img/db/step1.png') no-repeat center center;
        background-size:100%;
        top:4em;
        left:5em;
      }
      div.step2{
        position:absolute;
        width:80%;height:20em;
        background:url('../assets/img/db/step2.png') no-repeat center center;
        background-size:100%;
        top:4.5em;
        left:4em;
      }
      div.step3{
        position:absolute;
        width:80%;height:20em;
        background:url('../assets/img/db/step3.png') no-repeat center center;
        background-size:100%;
        top:7em;
        left:3em;
      }
      div.step4{
        position:absolute;
        width:80%;height:20em;
        background:url('../assets/img/db/step4.png') no-repeat center center;
        background-size:100%;
        top:9em;
        left:4em;
      }
      div.step5{
        position:absolute;
        width:80%;height:20em;
        background:url('../assets/img/db/step5.png') no-repeat center center;
        background-size:100%;
        top:6em;
        left:3em;
      }
    }




    div.tree{
      position:absolute;
      top:-4em;
      left:8%;
      width:7em;
      height:4em;
      background:url('../assets/img/db/jb_tree.png') no-repeat bottom;
      background-size:100%;
      z-index:100;
    }



    div.table{
      // padding:7% 5% 5%;
      margin-bottom:2em;
      &.greenBg{
        background:@lightG2;
      }
      h1{
        font-size:1em;color:@deepRed;position:relative;color:#fff;padding: 1.2em 5%;
        background-image: -webkit-linear-gradient( 90deg, rgb(84,159,59) 0%, rgb(105,176,108) 70%, rgb(105,176,108) 98%);
        span{
          display:inline-block;
          &.name{
            width:45%;
          }
          &.phone{
            width:45%;
            position:relative;padding-left: 1.5rem;
            i{
              position:absolute;left:0rem;top:-.1em;width:1.5em;height:1.5em;background:url('../assets/img/db/jb_phone.png') no-repeat center center; background-size: 100%;vertical-align:bottom;
            }
          }
        }

      }



      
    }
    ul.info{
        background:#fff;font-size:1.1em;
        &.fake{
          position:absolute;top:8.2em;width:100%;background:transparent;
          li{
            padding:0 5%;border:none;
            a{
              position:relative;z-index:1;
            }
            p{
              span{
                &.green{
                  color:#000;
                }
              }
              b{
                &.green{
                  color:#000;
                }
              }
            }
          }

        }
        li{
          padding:1em 5% 2em;border-bottom: 1.5px solid #eee;
          p{
            line-height: 2em;height:2em;
            span{
              display:inline-block;width:53%;
              &.green{color:#136042;}
              .star{
                display:inline-block;vertical-align:middle;margin-top: -.27rem;
              }
              &.highLight1{
                position:relative;z-index:200;background:#fff;
              }
              &.in{
                display:inline;
              }
            }
            b{
              font-weight:normal;
              &.yellow{
                color:#ffd04f;
              }
              &.green{color:#136042;}
              &.highLight1{
                position:relative;z-index:200;background:#fff;
              }
            }
            i{
              display:inline-block;width:2em;height:2em;background:url('../assets/img/db/jb_eyeClose.png') no-repeat center;background-size:100%;vertical-align:middle;margin-left:.4em;
              &.active{
                background:url('../assets/img/db/jb_eyeOpen.png') no-repeat center;background-size:100%;
              }
            }
          }
          a{
            margin:.5em 0;
            float: right;
            padding:.2em 1em;
            background:#eab933;
            color:#fff;
            border-radius: 9px;
            border:2px solid #fff;
            box-shadow: 0px 0px 2px #ddd;
          }
        }
      }
  }
  
}


</style>
