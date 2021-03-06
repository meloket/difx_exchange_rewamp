import { SearchOutlined } from '@ant-design/icons';
import { API_ENDPOINT, QUERY_KEY } from '@difx/constants';
import t from "@difx/locale";
import { SocketEvent, useFutureModal, useHttpGet, useMarketModal, useMarketPair, useSocket } from "@difx/shared";
import { Col, Drawer, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import MarketDrawer from "../../components/market/drawer";
import MarketModal from "../../components/market/modal";
import Stats from "../../components/market/stats";
import TopMarket from "../../components/market/TopMarket";
import FutureModal from './futureModal';
import { MarketCard, MarketContentStyled, PageStyled } from "./styled";

export function MarketWrapper() {
  const { data: marketData } = useHttpGet<null, any>(QUERY_KEY.MARKET_PAIRS, API_ENDPOINT.GET_MARKET_PAIRS, null);

  const [categoriesList, setCategoriesList] = useState([])
  const [topGainer, setTopGainer] = useState(null)
  const [topLooser, setTopLooser] = useState(null)
  const [topVolume, setTopVolume] = useState(null)
  const [topFutureList, setTopFutureList] = useState(null)

  const {drawerVisible, setDrawerVisible, spotList, setSpotList, futuresList, setFuturesList} = useMarketPair();
  const {modalVisible, setModalVisible} = useMarketModal();
  const {futureModalVisible, setFutureModalVisible} = useFutureModal()

  const data = useSocket({event: SocketEvent.prices});

  useEffect(() => {
    if(marketData){
      setSpotList(marketData.spot)
      setFuturesList(marketData.futures)
      setCategoriesList(marketData.categories)

      if(marketData.spot){
        const getTopGainer = [...marketData.spot].sort((a:any,b:any) => {
            return a.change < b.change ? 1 : -1
        })
        const getTopLooser = [...marketData.spot].sort((a:any,b:any) => {
          return a.change > b.change ? 1 : -1
        })
        const getTopVolume = [...marketData.spot].sort((a:any,b:any) => {
          return a.volume < b.volume ? 1 : -1
        })
        setTopGainer(getTopGainer)
        setTopLooser(getTopLooser)
        setTopVolume(getTopVolume)
      }

      if(marketData.futures){
        const toList = marketData.futures.slice(0,3)
        setTopFutureList(toList)
      }
    }
  }, [marketData]);

  useEffect(()=>{
    if(data && spotList){
      const newData = spotList.map(item => {
        if(item.symbol === data[0]){
          item.last = data[1]
          item.volume = data[2]
          item.change = data[3]
          return item
        }
        return item
      })
      setSpotList(newData)
    }
  },[data])

  const onCloseDrawer = () => {
    setDrawerVisible(false)
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const closeFutureModal = () => {
    setFutureModalVisible(false);
  };

  const onSearch = (e) => {
    const value = e.target.value;
    if (value && spotList) {
      const filteredSpotData = spotList.filter(e => e.currency1.toLowerCase().includes(value.toLowerCase()));
      setSpotList(filteredSpotData);
    } else{
      setSpotList(marketData.spot)
    }
    if(value && futuresList) {
      const filteredFutureData = futuresList.filter(e => e.currency1.toLowerCase().includes(value.toLowerCase()));
      setFuturesList(filteredFutureData)
    } else{
      setFuturesList(marketData.futures)
    }
  }

  return (
      <PageStyled>
        <MarketContentStyled style={{ padding: "0 50px", marginTop:"20px" }}>
            <Row align="middle">
                <Col xl={18} xs={12}>
                    <div className="title">{t("market.market")}</div>
                </Col>
                <Col xl={6} xs={12}>
                <div className="input-group search-input">
                  <Input onChange={onSearch} placeholder="Search" prefix={<SearchOutlined />} />
                </div>
                </Col>
            </Row>
            <MarketCard>
              <TopMarket  getTopGainer={topGainer} getTopLooser={topLooser} getTopVolume={topVolume} getFutures={topFutureList} />
            </MarketCard>
            <Stats spotList={spotList} futuresList={futuresList} categoriesList={categoriesList}/>
        </MarketContentStyled>
        <Drawer
          title="Overview"
          placement="left"
          onClose={onCloseDrawer}
          visible={drawerVisible}
        >
          <MarketDrawer />
        </Drawer>
        <Modal title="Quick Trade" visible={modalVisible} footer={null} onCancel={closeModal} maskClosable={false}>
            <MarketModal />
        </Modal>
        <Modal title="" visible={futureModalVisible} footer={null} onCancel={closeFutureModal} width={"50%"} style={{ top: 20 }} maskClosable={false}>
            <FutureModal />
        </Modal>
      </PageStyled>
  );
}

export default MarketWrapper;
