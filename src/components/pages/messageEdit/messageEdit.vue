<template lang="html">
  <div class="message-edit">
    <breadbar></breadbar>
    <div class="card steps-wrapper">
      <el-steps :active="curStep" finish-status="success" align-center class="steps">
        <el-step title="号码清单筛选"></el-step>
        <el-step title="短信配置"></el-step>
        <el-step title="提交审批"></el-step>
        <el-step title="结束"></el-step>
      </el-steps>
    </div>
    <div class="operate-wrapper">
      <div class="card operate1" v-show="curStep===0">
        <!--这里经过测试，使用:model能够顺利重置，但是使用v-model就不行,并且还必须在el-form-item中著名prop属性-->
          <el-form :model="phoneConditions" label-width="100px" class="phone-form" ref="phoneForm">
              <el-form-item label="产品系列:" prop="category">
                <el-select v-model="phoneConditions.category" placeholder="请选择产品系列">
                  <el-option v-for="cate in products" :label="cate.categoryName" :value="cate.categoryId"></el-option>
                </el-select>
                </el-form-item>
                  <el-form-item label="具体产品:" prop="product">
                <el-select v-model="phoneConditions.product" placeholder="请选择具体产品" multiple>
                  <el-option v-for="pro in curProducts" :label="pro.productName" :value="pro.productId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="号码类型:" prop="phoneType">
                <el-checkbox-group v-model="phoneConditions.phoneType">
                <el-checkbox label="1" name="phoneType">订购号码</el-checkbox>
                <el-checkbox label="2" name="phoneType">联系号码</el-checkbox>
              </el-checkbox-group>
              </el-form-item>
              <el-form-item label="号码状态:" prop="phoneState">
                <el-checkbox-group v-model="phoneConditions.phoneState">
                <el-checkbox label="1" name="phoneState">全停机</el-checkbox>
                <el-checkbox label="2" name="phoneState">半停机</el-checkbox>
                <el-checkbox label="3" name="phoneState">正常状态，可用余额不足下月</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="是否首充:" prop="shouchong">
                <el-switch v-model="phoneConditions.shouchong"></el-switch>
              </el-form-item>
              <el-form-item label="实时结余:" prop="jieyu">
                小于<el-input v-model="phoneConditions.jieyu"  style="width:60px;margin:0 10px"></el-input>元
              </el-form-item>
              <el-form-item class="btn-wrapper">
                <el-button type="primary" class="btn cancelbtn" @click="resetForm('phoneForm')">取消</el-button>
              <el-button type="primary" class="btn nextbtn" @click="nextStep">下一步</el-button>
              </el-form-item>
          </el-form>
      </div>
      <div class="card operate2" v-show="curStep===1">
        <el-form :model="messageConditions" label-width="100px" class="message-form"  ref="messageForm">
          <el-form-item label="全量发送:" prop="allDate">
            <el-select   v-model="messageConditions.allDate" multiple>
              <el-option v-for="i in dates" :label="'每月'+i+'号'" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="增量发送:" prop="incrementDate">
            <el-select   v-model="messageConditions.incrementDate" multiple>
              <el-option v-for="i in dates" :label="'每月'+i+'号'" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="短信内容:" prop="message">
            <el-input type="textarea" v-model="messageConditions.message" style="width:600px;"></el-input>
          </el-form-item>
          <div class="btn-wrapper">
            <el-button type="primary" class="btn cancelbtn" @click="resetForm('messageForm')">取消</el-button>
            <el-button type="primary" class="btn prevbtn" @click="prevStep">上一步</el-button>
          <el-button type="primary" class="btn nextbtn" @click="nextStep">下一步</el-button>
          </div>
        </el-form>
      </div>
      <div class="card operate3" v-show="curStep===2">
        <el-form :model="shenpiConditions" ref="shenpiForm">
        <el-row>
          <el-col :span="8">
            <span class="label">申请理由:</span>
            <el-form-item prop="reason">
            <el-input type="textarea" v-model="shenpiConditions.reason" class="reason-text"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="12" class="center">
           <span class="label">审批人员:</span>
           <el-form-item prop="selApproval">
            <el-transfer v-model="shenpiConditions.selApproval" :data="approvers" :titles="['可选人员','选中人员']"></el-transfer>
          </el-form-item>
          </el-col>
          <el-col :span="4" class="right">
            <div ><el-button type="primary" class="btn cancelbtn" @click="resetForm('shenpiForm')">取消</el-button></div>
            <div><el-button type="primary" class="btn prevbtn"  @click="prevStep">上一步</el-button></div>
          <div><el-button type="primary" class="btn nextbtn" @click="nextStep">提交</el-button></div>
          </el-col>
        </el-row>
      </el-form>
      </div>
      <div class="card operate4" v-show="curStep===3">
        <p>您已成功提交,</p>
        <p>请耐心等待审批结果!</p>
        <p><el-button type="primary" class="btn nextbtn" @click="nextStep">确定</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
import breadbar from '@/components/common/breadbar/breadbar.vue';
export default {
  created() {
    for (let i = 1; i <= 31; i++) {
      this.dates.push(i);
    }
  },
  data() {
    return {
      curStep: 0,
      dates: [],
      approvers: [{
          key: 0,
          label: '赵锡成'
        },
        {
          key: 1,
          label: '孟琳琳'
        },
        {
          key: 2,
          label: '武宗涛'
        },
        {
          key: 3,
          label: '郑永广'
        }
      ],
      products: [{
          categoryId: 1,
          categoryName: '百度圣卡',
          children: [{
              productId: 23333,
              productName: '百度大圣卡'
            },
            {
              productId: 12323,
              productName: '百度小圣卡'
            }
          ]
        },
        {
          categoryId: 2,
          categoryName: '微博卡',
          children: [{
              productId: 23333,
              productName: '微博V+卡'
            },
            {
              productId: 12423,
              productName: '微博大V卡'
            },
            {
              productId: 12323,
              productName: '微博金V卡'
            }
          ]
        }
      ],

      phoneConditions: {
        category: '', // 产品类别
        product: [], // 具体产品
        phoneType: [], // 号码类型
        phoneState: [], // 号码状态
        shouchong: false,
        jieyu: ''
      },
      messageConditions: {
        allDate: [],
        incrementDate: [],
        message: ''
      },
      shenpiConditions: {
        reason: '',
        selApproval: []
      }
    };
  },
  components: {
    breadbar
  },
  methods: {
    nextStep() {
      this.curStep++;
      if (this.curStep === 4) {
        this.curStep = 0;
      }
    },
    prevStep() {
      if (this.curStep > 0) {
        this.curStep--;
      }
    },
    resetForm(formName) {
      console.log(this.phoneConditions);
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        console.log(this.phoneConditions);
      });
    }
  },
  computed: {
    curProducts() {
      if (this.phoneConditions.category) {
        return this.products.find((item) => {
          return item.categoryId == this.phoneConditions.category;
        }).children;
      } else {
        return [];
      }
    }
  }
}
</script>

<style lang="scss">
.message-edit {
    width: 90%;
    margin: 0 auto;
    .card {
        border: 1px solid #d1dbe5;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        padding: 20px;
    }

    .steps-wrapper {
        margin-top: 15px;
        .el-steps {
            vertical-align: center;
            margin: 10px 0 0 12%;
        }
    }
    .operate-wrapper {
        margin-top: 30px;
        .el-form-item__label {
            font-weight: 600;
            color: #20A0FF;
            /*margin-right: 10px;*/
        }
        .btn-wrapper {
            text-align: center;
            .btn {
                margin: 0 15px;
            }
        }
        .operate3 {
            .label {
                font-weight: 600;
                color: #20A0FF;
                display: block;
                margin-bottom: 15px;
                margin-left: 10%;
            }
            .reason-text textarea {
                width: 80%;
                margin: 0 auto;
                min-height: 300px;
            }
            .center {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                .label {
                    align-self: flex-start;
                    margin-left: 20%;
                }
            }
            .right {
                min-height: 350px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                div {
                    margin: 15px 0;
                }
            }
        }
        .operate4 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            min-height: 300px;
            p {
                font-size: 54px;
                color: #20A0FF;
                margin: 15px 0;
                font-family: '楷体';
            }
        }
    }

}
</style>
