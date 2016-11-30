import React from 'react'
class City extends React.Component {

    json =
    [
      { "name": "北京", "city":[{"name":"北京", "area":["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","平谷区","怀柔区","密云县","延庆县"]}]},

      { "name": "上海", "city":[

          {"name":"上海", "area":["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","宝山区","闵行区","嘉定区","松江区","金山区","青浦区","南汇区","奉贤区","浦东新区","崇明县","其他"]}

      ]},

      { "name": "江苏", "city":[

          {"name":"南京", "area":["玄武区","白下区","秦淮区","建邺区","鼓楼区","下关区","栖霞区","雨花台区","浦口区","江宁区","六合区","溧水县","高淳县","其他"]},

          {"name":"苏州", "area":["金阊区","平江区","沧浪区","虎丘区","吴中区","相城区","常熟市","张家港市","昆山市","吴江市","太仓市","其他"]},

          {"name":"无锡", "area":["崇安区","南长区","北塘区","滨湖区","锡山区","惠山区","江阴市","宜兴市","其他"]},

          {"name":"常州", "area":["钟楼区","天宁区","戚墅堰区","新北区","武进区","金坛市","溧阳市","其他"]},

          {"name":"镇江", "area":["京口区","润州区","丹徒区","丹阳市","扬中市","句容市","其他"]},

          {"name":"南通", "area":["崇川区","港闸区","通州市","如皋市","海门市","启东市","海安县","如东县","其他"]},

          {"name":"泰州", "area":["海陵区","高港区","姜堰市","泰兴市","靖江市","兴化市","其他"]},

          {"name":"扬州", "area":["广陵区","维扬区","邗江区","江都市","仪征市","高邮市","宝应县","其他"]},

          {"name":"盐城", "area":["亭湖区","盐都区","大丰市","东台市","建湖县","射阳县","阜宁县","滨海县","响水县","其他"]},

          {"name":"连云港", "area":["新浦区","海州区","连云区","东海县","灌云县","赣榆县","灌南县","其他"]},

          {"name":"徐州", "area":["云龙区","鼓楼区","九里区","泉山区","贾汪区","邳州市","新沂市","铜山县","睢宁县","沛县","丰县","其他"]},

          {"name":"淮安", "area":["清河区","清浦区","楚州区","淮阴区","涟水县","洪泽县","金湖县","盱眙县","其他"]},

          {"name":"宿迁", "area":["宿城区","宿豫区","沭阳县","泗阳县","泗洪县","其他"]},

          {"name":"其他", "area":["其他"]}

      ]},

      { "name": "浙江", "city":[

          {"name":"杭州", "area":["拱墅区","西湖区","上城区","下城区","江干区","滨江区","余杭区","萧山区","建德市","富阳市","临安市","桐庐县","淳安县","其他"]},

          {"name":"宁波", "area":["海曙区","江东区","江北区","镇海区","北仑区","鄞州区","余姚市","慈溪市","奉化市","宁海县","象山县","其他"]},

          {"name":"温州", "area":["鹿城区","龙湾区","瓯海区","瑞安市","乐清市","永嘉县","洞头县","平阳县","苍南县","文成县","泰顺县","其他"]},

          {"name":"嘉兴", "area":["秀城区","秀洲区","海宁市","平湖市","桐乡市","嘉善县","海盐县","其他"]},

          {"name":"湖州", "area":["吴兴区","南浔区","长兴县","德清县","安吉县","其他"]},

          {"name":"绍兴", "area":["越城区","诸暨市","上虞市","嵊州市","绍兴县","新昌县","其他"]},

          {"name":"金华", "area":["婺城区","金东区","兰溪市","义乌市","东阳市","永康市","武义县","浦江县","磐安县","其他"]},

          {"name":"衢州", "area":["柯城区","衢江区","江山市","龙游县","常山县","开化县","其他"]},

          {"name":"舟山", "area":["定海区","普陀区","岱山县","嵊泗县","其他"]},

          {"name":"台州", "area":["椒江区","黄岩区","路桥区","临海市","温岭市","玉环县","天台县","仙居县","三门县","其他"]},

          {"name":"丽水", "area":["莲都区","龙泉市","缙云县","青田县","云和县","遂昌县","松阳县","庆元县","景宁畲族自治县","其他"]},

          {"name":"其他", "area":["其他"]}

      ]},

      { "name": "四川", "city":[

          {"name":"成都", "area":["青羊区","锦江区","金牛区","武侯区","成华区","龙泉驿区","青白江区","新都区","温江区","都江堰市","彭州市","邛崃市","崇州市","金堂县","郫县","新津县","双流县","蒲江县","大邑县","其他"]},

          {"name":"自贡", "area":["大安区","自流井区","贡井区","沿滩区","荣县","富顺县","其他"]},

          {"name":"攀枝花", "area":["仁和区","米易县","盐边县","东区","西区","其他"]},

          {"name":"泸州", "area":["江阳区","纳溪区","龙马潭区","泸县","合江县","叙永县","古蔺县","其他"]},

          {"name":"德阳", "area":["旌阳区","广汉市","什邡市","绵竹市","罗江县","中江县","其他"]},

          {"name":"绵阳", "area":["涪城区","游仙区","江油市","盐亭县","三台县","平武县","安县","梓潼县","北川羌族自治县","其他"]},

          {"name":"广元", "area":["元坝区","朝天区","青川县","旺苍县","剑阁县","苍溪县","市中区","其他"]},

          {"name":"遂宁", "area":["船山区","安居区","射洪县","蓬溪县","大英县","其他"]},

          {"name":"内江", "area":["市中区","东兴区","资中县","隆昌县","威远县","其他"]},

          {"name":"乐山", "area":["市中区","五通桥区","沙湾区","金口河区","峨眉山市","夹江县","井研县","犍为县","沐川县","马边彝族自治县","峨边彝族自治县","其他"]},

          {"name":"南充", "area":["顺庆区","高坪区","嘉陵区","阆中市","营山县","蓬安县","仪陇县","南部县","西充县","其他"]},

          {"name":"眉山", "area":["东坡区","仁寿县","彭山县","洪雅县","丹棱县","青神县","其他"]},

          {"name":"宜宾", "area":["翠屏区","宜宾县","兴文县","南溪县","珙县","长宁县","高县","江安县","筠连县","屏山县","其他"]},

          {"name":"广安", "area":["广安区","华蓥市","岳池县","邻水县","武胜县","其他"]},

          {"name":"达州", "area":["通川区","万源市","达县","渠县","宣汉县","开江县","大竹县","其他"]},

          {"name":"雅安", "area":["雨城区","芦山县","石棉县","名山县","天全县","荥经县","宝兴县","汉源县","其他"]},

          {"name":"巴中", "area":["巴州区","南江县","平昌县","通江县","其他"]},

          {"name":"资阳", "area":["雁江区","简阳市","安岳县","乐至县","其他"]},

          {"name":"阿坝藏族羌族自治州", "area":["马尔康县","九寨沟县","红原县","汶川县","阿坝县","理县","若尔盖县","小金县","黑水县","金川县","松潘县","壤塘县","茂县","其他"]},

          {"name":"甘孜藏族自治州", "area":["康定县","丹巴县","炉霍县","九龙县","甘孜县","雅江县","新龙县","道孚县","白玉县","理塘县","德格县","乡城县","石渠县","稻城县","色达县","巴塘县","泸定县","得荣县","其他"]},

          {"name":"凉山彝族自治州", "area":["西昌市","美姑县","昭觉县","金阳县","甘洛县","布拖县","雷波县","普格县","宁南县","喜德县","会东县","越西县","会理县","盐源县","德昌县","冕宁县","木里藏族自治县","其他"]},

          {"name":"其他", "area":["其他"]}

      ]},
    ]
    style = {
        margin: "10px",
        padding: "2px 6px",
        fontSize: "14px",
        border:0,
        display:'inline',
        //width: 30%
    }
    provinceOption =  function(){
        return this.json.map(function(array, index){
            return (<option key={index} data-index={index}>{array.name}</option>);
        });
    }
    cityOption = function(){
        if(this.index.provinceIndex == -1){
            return false;
        }else{
            return this.json[this.index.provinceIndex].city.map(function(array, index){
                return (<option key={index} data-index={index}>{array.name}</option>);
            });
        }
    }
    countyOption = function(){
        if(this.index.cityIndex == -1){
            return false;
        }else{
            return this.json[this.index.provinceIndex].city[this.index.cityIndex].area.map(function(array, index){
                return (<option key={index} data-index={index}>{array}</option>);
            });
        }
    }
    index = {
        provinceIndex: -1,
        cityIndex: -1
    }
    state = {

            city: this.cityOption(),
            county: this.countyOption()

    }

    provinceChange(event){
      const { increment , hide} = this.props
        var e = event.target;
        this.index.provinceIndex = e.options[e.selectedIndex].getAttribute("data-index");
        this.index.cityIndex = -1;
        this.setState({
            city: this.cityOption(),
            county: this.countyOption()
        });
        increment(0,e.options[e.selectedIndex].innerHTML);
        increment(1,"");
        increment(2,'');
        this.refs.city.value = "-1";
        this.refs.county.value = "-1";
    }
    cityChange (event){
      const { increment , hide} = this.props
        var e = event.target;
        this.index.cityIndex = e.options[e.selectedIndex].getAttribute("data-index");
        this.setState({
            county: this.countyOption()
        });
        increment(1,e.options[e.selectedIndex].innerHTML);
        increment(2,'');
        this.refs.county.value = "-1";
    }

    countyChange (event){
      const { increment , hide} = this.props
        var e = event.target;
        this.index.cityIndex = e.options[e.selectedIndex].getAttribute("data-index");
        increment(2,e.options[e.selectedIndex].innerHTML);
    }
    render (){
      const { increment , hide} = this.props
        return (
          <div className="citybox animated">
              <header>
                  <span id="back_city" style={{'display':'none'}}><i></i>上一步</span>
                  <span className="seltit"></span>
                  <span id="close_city" onTouchTap={()=>{
                    hide()
                  }}>确定</span>
              </header>
              <select id="provinces" className="selects animated" name={this.props.provinceName ? this.props.provinceName : "province"} style={this.style} onChange={this.provinceChange.bind(this)}>
                  <option key="-1" value="-1" data-index="-1">省份</option>
                  {this.provinceOption()}
              </select>
              <select id="citys" className="selects animated" name={this.props.cityName ? this.props.cityName : "city"} style={this.style} onChange={this.cityChange.bind(this)} ref="city">
                  <option key="-1" value="-1" data-index="-1">地级市</option>
                  {this.state.city}
              </select>
              <select  className="selects animated" name={this.props.countyName ? this.props.countyName : "county"} style={this.style} onChange={this.countyChange.bind(this)} ref="county">
                  <option key="-1" value="-1" data-index="-1">市、县级市</option>
                  {this.state.county}
              </select>
          </div>



        );
    }
}
export default City
