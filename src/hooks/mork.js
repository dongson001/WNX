var express = require('express');
var router = express.Router();
//判断去橙子开户或是去鉴权或者直接去下单
router.get('/scence/orangebank/orangeAccount.jsonp',function(req,res,next){
    res.jsonp({
        responseMessage: "橙子账户未激活或不存在",
        responseData: {
            orange: "",
            orangeURL: "https://ibpu1.sdb.com.cn/ibd/page/web_for_h5/mainAcct_h5/index.html?environment=u1#jinKe/index/input/198201/fe9ea3017d984009cdf1528b08c03519d1a8a7ae0df92a3e3d4fb5872accb4945920c2e047305624ed066fc555b611118d41e5af94254f762c58459d5364d7c02aee1f5a9d51b694b0a9d671841f689bdee466e20e8fc8e7f308c420866d300250e595a7a6233e98455f2f1d7211733db2f6bfac079e180394ac652e7dab781d93e3b158eacbc8d22208c8d077860183a99a6741b2b394fc586e2beeed44cad7379136c05b7d254aeb015ff4103c9fcd26e6719ff545d8583e72c8df3936e1af01e2474ac38f2e872277052c8aa44dd6e80200dbb615efb5438d3c186670716852e6ee84050888234e4855eaae08a3ef924c12b6c5f3839bd2e781ce5d2d3374ad9334b578e5fa8a8f034e8acb0a99a9c8a08bd2ed5eba57df6a6eafddb27e7824e4b20c1d13d4df4bb0435a736e83f3/5441107e80c7a06d8dd1adb00d3842951efbc752536a3d4f6f5197ee7627a5b0aa4854042eef362cd661c1f7968f0f1daa1c4dea3a0e8ddce4e8c3edf40e895a58a30e18a9e3001d0c509f7d98bcbedb68ea553b6082d1fb25681c88a4ed9b22885b2db6476fdb0ca2e3ffe83976ca88486ea31cd72c59e29666b73e5db6d42c"
        },
        responseCode: "000001"
    })
})

//产品详情
router.get('/product/quer/productInfo.do',(req,res,next)=>{
    res.jsonp({
      'responseMessage':'登录超时',
      'responseCode':'000000',
      "responseData": {
            "productId": 10000400,
            "productName": "女性关爱保险",
            "productCode": "10000513",
            "productSide": "20001",
            "productFeature": "1、专门针对女性群体，意外保险金最高50万； 2、保障责任简单清晰，方便客户快速甄选； 3、特有女性特定癌专属保障，就医服务。",
            "productShortName": "女性关爱保险",
            "productSlogan": "女人自己爱自己，平安女性关爱保险，为女性健康护航",
            "productStatus": "0",
            "insurancePriodUnit": "Y",
            "productbannerUrl": "http://m.pingan.com/app_images/wap/v30/c3/chaoshi/sys/baoxian/nvxingzhongji_banner.jpg",
            "insurancePriod": "1",
            "unit": "0",
            "productIntroduce": "适用人群：18-60周岁 保障项目：女性专属保障（乳腺癌、其它女性特定癌症）、意外身故/伤残，赠送就医服务",
            "insuranceNotice": "1、24小时理赔报案电话：95511； 2、意外伤害身故/伤残无等待期，女性特定癌责任等待期为90天； 3、就诊医院要求：中华人民共和国境内（港、澳、台地区除外）合法经营的二级及二级以上公立医院； 4、不承担4类及4类以上职业类别人员因工作发生的意外身故、伤残责任。查看职业分类表 ，职业类别不明请咨询40088-95512转2。 ",
            "insuranceScope": "",
            "productDescUrl": "www.pingan.com",
            "commonIssueList": [
                {
                    "Q": "什么是意外？",
                    "A": "“意外”需同时满足外来的、突发的、非本意的和非疾病的四个要素，符合此要求造成的身体伤害才可以在本产品中获得赔付哦。"
                },
                {
                    "Q": "这款产品如何续保？",
                    "A": "健康类责任的产品建议您一定连续投保，以使自己的保障没有断档。我们会在这款产品到期前以邮件、短信等方式提示您续保，请一定留意这些讯息，以免错过续保时间。"
                },
                {
                    "Q": "这款产品如何申请赔付？",
                    "A": "客户购买此产品等待期过后，请通过拨打95511-6-1-9进行报案；并准备相关诊疗证明等材料，申请理赔。"
                },
                {
                    "Q": "被保险人有哪些限制？",
                    "A": "您可以为出生18-40周岁身体健康，且没有出现健康告知中提及的状况的本人、父亲、配偶和儿子投保；并且续保可至60周岁。续保费用可能会根据您的年龄变化而发生变化。"
                },
                {
                    "Q": "我应该怎样选择保额？",
                    "A": "您可根据您的实际需求和支付能力在备选保额中进行搭配选择，如果考虑万一不测时能给家人留一笔钱，可以选择较高的意外伤害保额；如果注重医疗保障，像发生医疗费用时可以报销一部分，减轻经济负担，则可选择较高的意外医疗保障，但是意外医疗的保额最多不能超过意外伤害的保额。"
                },
                {
                    "Q": "我应该怎样选择保额？",
                    "A": "您可根据您的实际需求和支付能力在备选保额中进行搭配选择，如果考虑万一不测时能给家人留一笔钱，可以选择较高的意外伤害保额；如果注重医疗保障，像发生医疗费用时可以报销一部分，减轻经济负担，则可选择较高的意外医疗保障，但是意外医疗的保额最多不能超过意外伤害的保额。"
                },
                {
                    "Q": "什么是等待期？",
                    "A": "等待期是指合同在生效的指定时期内，即使发生保险事故，受益人也不能获得保险赔偿，这段时期称为等待期。等待期是为了防止投保人隐瞒高风险因素而投保以获得保险金的行为。"
                },
                {
                    "Q": "什么是原位癌？",
                    "A": "通俗来讲是上皮的恶性肿瘤局限在了皮肤或粘膜内，还没有通过皮肤或粘膜下面的基底膜侵犯到真皮组织，更没有发生浸润和远处转移的状态。因此，原位癌有时也被称为“浸润前癌”或“0期癌”，严格意义上而言，它根本算不上真正的癌症。"
                },
                {
                    "Q": "保险单从什么时候开始生效？",
                    "A": "保单生效日可自由选择，但最早只能次日生效，且自保险合同生效日起的30日为等待期（连续投保无等待期）。"
                },
                {
                    "Q": "投保人和被保险人有什么限制？",
                    "A": "被保险人只能是投保人的本人、父亲、配偶或儿子，并且投保人需要对被保险人的健康状况进行确认，未患有健康告知中所述疾病。"
                },
                {
                    "Q": "填写被保险人信息的注意事项？",
                    "A": "被保险人的手机号码不是必填项，如果填写，被保险人可免费接收保单通知短信。"
                }
            ],
            "urlLiPeiFuWu": "http://www.baidu.com",
            "insuranceStatement": "1、 本投保人兹声明以上述各项内容填写属实，已征得被保险人同意，被保险人认可保险金额和告知内容，若未如实告知，保险人有权根据《保险法》第十六条之规定采取如下措施：1.解除合同；2.不承担赔偿或者给付保险金的责任；3.不退还保费。注：被保险人所在地区应为除西藏、香港、澳门、台湾地区以外的中华人民共和国境内其他地区。 2、本投保人已阅读《女性关爱保险适用条款》，并特别就条款中有关责任免除和投保人、被保险人义务的内容进行阅读。 本投保人同意投保，接受条款全部内容。 因下列情形之一导致被保险人身故或伤残的，本公司不承担给付保险金的责任： （一）投保人对被保险人的故意杀害、故意伤害； （二）被保险人故意自伤、故意犯罪或者抗拒依法采取的刑事强制措施或自杀，但被保险人自杀时为无民事行为能力人的除外； （三）被保险人殴斗、醉酒，主动吸食或注射毒品； （四）被保险人酒后驾驶、无合法有效驾驶证驾驶，或驾驶无有效行驶证的机动车； （五）战争、军事冲突、暴乱或武装叛乱； （六）核爆炸、核辐射或核污染； （七）被保险人因妊娠（含宫外孕）、流产、分娩（含剖宫产）导致的伤害； （八）被保险人因医疗事故、药物过敏或精神和行为障碍（依照世界卫生组织《疾病和有关健康问题的国际统计分类（ICD-10）》确定）导致的伤害； （九）被保险人未遵医嘱，私自使用药物，但按使用说明的规定使用非处方药不在此限； （十）猝死、细菌或病毒感染（因意外伤害导致的伤口发生感染者除外）； （十一）被保险人从事潜水、跳伞、攀岩、蹦极、驾驶滑翔机或滑翔伞、探险、摔跤、武术比赛、特技表演、赛马、赛车等高风险运动。 发生上述第一项情形导致被保险人身故的，本合同终止，本公司向受益人退还本合同的未满期净保险费。 发生上述其它情形导致被保险人身故的，本合同终止，本公司向投保人退还本合同的未满期净保险费。 其他免责责任详见条款。 注：请您仔细阅读《健康告知》，若未如实告知其中列明的疾病情况，保险人有权解除合同并对保险合同解除前发生的保险事故，不承担赔偿或给付保险金的责任，并不退还保费。 争议处理：本保险单受中华人民共和国司法管辖。当对本保险合同发生争议时，双方应协商解决；经双方协商未达协议的，双方均可向平安养老保险股份有限公司北京分公司住所地北京铁路运输法院提起诉讼 3、健康告知 a、本人承诺被保险人未正在或曾经患有以下疾病或存下列情况： 1)癌症/恶性肿瘤、交界性肿瘤、癌前病变、原位癌或性质未明确的肿块/息肉/结节/肿瘤/新生物； 2)肿瘤指标检查异常（甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199））； 3)子宫颈疾病且宫颈上皮内瘤变检测CIN III级或HPV阳性； 4)侵蚀性葡萄胎。 b、本人承诺被保险人未在最近六个月内是否有新发或以往既有下列身体不适症状： 外生殖器溃疡、半年内体重增加或减少5公斤以上。 4、根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式。本人接受以平安养老保险股份有限公司提供的电子保单作为本投保书成立的合法有效凭证，具有完全证据效力。 5、本人授权平安集团，除法律另有规定之外，将本人提供给平安集团的信息、享受平安集团服务产生的信息（包括本单证签署之前提供和产生的信息）以及平安集团根据本条约定查询、收集的信息，用于平安集团及其因服务必要委托的合作伙伴为本人提供服务、推荐产品、开展市场调查与信息数据分析。 本人授权平安集团，除法律另有规定之外，基于为本人提供更优质服务和产品的目的，向平安集团因服务必要开展合作的伙伴提供、查询、收集本人的信息。 为确保本人信息的安全，平安集团及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。 本条款自本单证签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。 本条所称“平安集团”是指中国平安保险（集团）股份有限公司及其直接或间接控股的公司，以及中国平安保险（集团）股份有限公司直接或间接作为其单一最大股东的公司。 如您不同意上述授权条款的部分或全部，可致电客服热线（95511）取消或变更授权。",
            "urlCommonIssue": "http://www.pingan.com/commonIssue",
            "surrenDerType": "0",
            "insuranceAge": 10,
            "lockPeriod": "3",
            "lockPeriodUnit": "M",
            "investmentAmount": 1000,
            "increaseAmount": 1000,
            "singleOrderQuota": 10000,
            "singlePersonQuota": 20000,
            "residualAmount": 900000,
            "salesAmount": 40000,
            "minGuranteedRate": "5.6",
            "historicalYield": "5.00",
            "incomeRate": "7.00",
            "policyEffectDateInfo": "",
            "hesitatePeriod": "3",
            "hesitatePeriodUnit": "Y",
            "hesitatePeriodDesc": "",
            "riskLevel": "05",
            "insuranceTips": "http://toubaotishishu.com.cn",
            "systemTime": "",
            "priceList": [
                {
                    "premium": "242",
                    "planList": [
                        {
                            "securityProAssuredSum": "赠送",
                            "securityProName": "就医服务"
                        },
                        {
                            "securityProAssuredSum": "10万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P1125",
                            "securityProName": "意外身故/伤残",
                            "benLevel": "31",
                            "securityProInstruction": "在保险期间内，被保险人不幸遭受意外事故导致身故或残疾，我们按条款给付意外身故保险金或意外残疾保险金。"
                        },
                        {
                            "securityProAssuredSum": "5万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P032203",
                            "securityProName": "其它女性特定癌症",
                            "securityFirstProName": "女性专属保障",
                            "benLevel": "00",
                            "securityProInstruction": "90天等待期后，被保险人经医院确诊初次发生原发性乳腺癌、原发性其它女性特定癌症，我们将按条款给付女性特定癌保险金。上述原发性癌不包括原位癌。注：其它女性特定癌症是指原发于子宫颈、子宫、卵巢、输卵管和阴道的恶性肿瘤。"
                        },
                        {
                            "securityProAssuredSum": "5万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P032202",
                            "securityProName": "乳腺癌",
                            "securityFirstProName": "女性专属保障",
                            "benLevel": "00",
                            "securityProInstruction": "90天等待期后，被保险人经医院确诊初次发生原发性乳腺癌、原发性其它女性特定癌症，我们将按条款给付女性特定癌保险金。上述原发性癌不包括原位癌。注：其它女性特定癌症是指原发于子宫颈、子宫、卵巢、输卵管和阴道的恶性肿瘤。"
                        }
                    ],
                    "skuId": 10000320,
                    "priceName": "经济型"
                },
                {
                    "premium": "577",
                    "planList": [
                        {
                            "securityProAssuredSum": "赠送",
                            "securityProName": "就医服务"
                        },
                        {
                            "securityProAssuredSum": "30万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P1125",
                            "securityProName": "意外身故/伤残",
                            "benLevel": "31",
                            "securityProInstruction": "在保险期间内，被保险人不幸遭受意外事故导致身故或残疾，我们按条款给付意外身故保险金或意外残疾保险金。"
                        },
                        {
                            "securityProAssuredSum": "10万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P032203",
                            "securityProName": "其它女性特定癌症",
                            "securityFirstProName": "女性专属保障",
                            "benLevel": "00",
                            "securityProInstruction": "90天等待期后，被保险人经医院确诊初次发生原发性乳腺癌、原发性其它女性特定癌症，我们将按条款给付女性特定癌保险金。上述原发性癌不包括原位癌。注：其它女性特定癌症是指原发于子宫颈、子宫、卵巢、输卵管和阴道的恶性肿瘤。"
                        },
                        {
                            "securityProAssuredSum": "10万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P032202",
                            "securityProName": "乳腺癌",
                            "securityFirstProName": "女性专属保障",
                            "benLevel": "00",
                            "securityProInstruction": "90天等待期后，被保险人经医院确诊初次发生原发性乳腺癌、原发性其它女性特定癌症，我们将按条款给付女性特定癌保险金。上述原发性癌不包括原位癌。注：其它女性特定癌症是指原发于子宫颈、子宫、卵巢、输卵管和阴道的恶性肿瘤。"
                        }
                    ],
                    "skuId": 10000321,
                    "priceName": "基本型"
                },
                {
                    "premium": "1047",
                    "planList": [
                        {
                            "securityProAssuredSum": "赠送",
                            "securityProName": "就医服务"
                        },
                        {
                            "securityProAssuredSum": "50万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P1125",
                            "securityProName": "意外身故/伤残",
                            "benLevel": "31",
                            "securityProInstruction": "在保险期间内，被保险人不幸遭受意外事故导致身故或残疾，我们按条款给付意外身故保险金或意外残疾保险金。"
                        },
                        {
                            "securityProAssuredSum": "20万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P032203",
                            "securityProName": "其它女性特定癌症",
                            "securityFirstProName": "女性专属保障",
                            "benLevel": "00",
                            "securityProInstruction": "90天等待期后，被保险人经医院确诊初次发生原发性乳腺癌、原发性其它女性特定癌症，我们将按条款给付女性特定癌保险金。上述原发性癌不包括原位癌。注：其它女性特定癌症是指原发于子宫颈、子宫、卵巢、输卵管和阴道的恶性肿瘤。"
                        },
                        {
                            "securityProAssuredSum": "20万",
                            "premTerm": "12M",
                            "premType": "1",
                            "planCode": "P032202",
                            "securityProName": "乳腺癌",
                            "securityFirstProName": "女性专属保障",
                            "benLevel": "00",
                            "securityProInstruction": "90天等待期后，被保险人经医院确诊初次发生原发性乳腺癌、原发性其它女性特定癌症，我们将按条款给付女性特定癌保险金。上述原发性癌不包括原位癌。注：其它女性特定癌症是指原发于子宫颈、子宫、卵巢、输卵管和阴道的恶性肿瘤。"
                        }
                    ]
                }
            ],
            "insuranceClauseList": [
                {
                    "name": "平安短期意外伤害保险（2013 版）条款",
                    "url": "http://baoxiantiaokuan.com.cn/ywbx"
                },
                {
                    "name": "平安男女性特定癌症疾病保险条款",
                    "url": "http://baoxiantiaokuan.com.cn/ywbx"
                }
            ]
        }
    })
})
//判断是否登录
router.get('/sso/account/getAccessTicket.do',(req,res,next)=>{
    res.jsonp({
        'responseMessage':'登录超时',
        'responseCode':'000000',
        'responseData':{
            targetURLSymbol:'04',
            clientNo:'111'
        }
    })
})
//用户信息回显
router.get('/scene/handler.do',(req,res,next)=>{
  res.jsonp({
      'responseMessage':'',
      'responseCode':'000000',
      'responseData':{
          memberName:'王小宝',
          memberCertype:'1',//"证件类型：1 身份证、2 护照、3 军官证或士兵证、 6 港澳通行证/回乡证或台胞证、0 其它、L 户口本    "
          memberIdno:'afsdflkasjdf',
          memberMobileNo:'sfasdfa',
          memberEmail:'11@pingan.com.cn',
          memberSex:'M'
      }
  })
})
//判断是否满18岁
router.get('/yanglao/order/checkInfoForPlacingOrder.do',(req,res,next)=>{
    res.jsonp({
        'responseMessage':'test',
        'responseCode':'000000'
    })
})

//判断升级
router.get('/sso/account/checkOrderPayCondition.do',(req,res,next)=>{
    res.jsonp({
        'responseMessage':'登录超时',
        'responseCode':'000000',
        'responseData':{
            targetURLSymbol:'04',
            clientNo:'111'
        }
    })
})
//判断
export default router
