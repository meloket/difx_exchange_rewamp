import React, { useEffect } from "react";
import { Button, Divider, Space } from "antd";
import { Icon } from "@difx/core-ui";
import t from "@difx/locale";
import { TopBalanceWrapper } from "./styled";
import TotalBalance from "./totalBalance";
import OverviewPNL from "./overviewPNL";
import Link from "next/link";
import { useLocalStorage, useTransferModal, useWalletWithdrawModal } from "@difx/shared";
import { STORE_KEY } from "@difx/constants"

export interface TopBalanceInterface{
    type,
    heading: string,
    amount: number,
    currency: number,
    yesterdayPnlHeading?: string,
    yesterdayPnlAmount?: number,
    yesterdayPnlCurrency?: number,
    overviewPnlHeading?: string,
    overviewPnlAmount?: number,
    overviewPnlCurrency?: number,
    bgImage?: string,
    hideBalance?: boolean,
    setHideBalance?: any,
}

export function TopBalance({
        type,
        heading,
        amount, 
        currency,
        yesterdayPnlHeading,
        yesterdayPnlAmount,
        yesterdayPnlCurrency,
        overviewPnlHeading,
        overviewPnlAmount, 
        overviewPnlCurrency, 
        bgImage,
        hideBalance,
        setHideBalance,
    }: TopBalanceInterface) {
        const {modalVisible, setModalVisible} = useWalletWithdrawModal();
        const {transferModalVisible, setTransferModalVisible} = useTransferModal()

    return (
        <TopBalanceWrapper>
            <div className="total-balance-wrapper">
                    <div className="bg-img-abs-right">
                        <img src={`/imgs/${bgImage}.svg`} alt="" />
                    </div>
                <Space split={<Divider type="vertical" />} size={20}>
                    <TotalBalance 
                        heading={heading} 
                        amount={amount} 
                        currency={currency} 
                        hideBalance={hideBalance}
                        setHideBalance={setHideBalance}
                    />
                    {type === "spot" ? 
                    <div className="total-balance yesterday-pl">
                        <div className="total-balance-heading">
                            <p>{t("wallet.yesterday_pl")} (BTC)</p>
                        </div>
                        <h4>{hideBalance ? "****" : yesterdayPnlAmount}</h4>
                        <h6>??? ${hideBalance ? "****" : yesterdayPnlCurrency}</h6>
                    </div>
                    :
                    null
                    }
                    {type === "overview" ? null :
                        <OverviewPNL 
                            overviewHeading={overviewPnlHeading} 
                            overviewAmount={overviewPnlAmount} 
                            overviewCurrency={overviewPnlCurrency}
                            hideBalance={hideBalance}
                        />
                    }
                </Space>
                {type == "overview" ? 
                    <Space className="wallet-btn-group">
                        <Link href="/wallet/deposit"><Button type="primary">{t("wallet.deposit")}</Button></Link>
                        <Link href="/wallet/withdraw"><Button type="ghost">{t("wallet.withdraw")}</Button></Link>
                        {/* <Button type="ghost" onClick={() => {setModalVisible(!modalVisible)}}>{t("wallet.withdraw")}</Button>
                        <Button type="ghost" onClick={() => {setTransferModalVisible(!transferModalVisible)}}>{t("wallet.transfer")}</Button> */}
                    </Space>
                :
                null
                }
                {type === "spot" ?
                    <Space className="wallet-btn-group">
                        <Link href="/wallet/deposit"><Button type="primary">{t("wallet.deposit")}</Button></Link>
                        <Link href="/wallet/withdraw"><Button type="ghost">{t("wallet.withdraw")}</Button></Link>
                        {/* <Button type="ghost" onClick={() => {setModalVisible(!modalVisible)}}>{t("wallet.withdraw")}</Button>
                        <Button type="ghost" onClick={() => {setTransferModalVisible(!transferModalVisible)}}>{t("wallet.transfer")}</Button>
                        <Button type="link" icon={<Icon.EyeVisibleIcon width={16}/>} className="anchor-link"> {t("wallet.pl_analysis")}</Button> */}
                    </Space>
                :
                null
                }
                {type === "earn" ?
                    <Space className="wallet-btn-group">
                        <Button type="primary">{t("wallet.stake_now")}</Button>
                        <Button type="ghost">{t("wallet.history")}</Button>
                    </Space>
                :
                null
                }
                {type === "futures" ?
                    <Space className="wallet-btn-group">
                        <Button type="primary" onClick={() => {setTransferModalVisible(!transferModalVisible)}}>{t("wallet.transfer")}</Button>
                        <Button type="ghost">{t("wallet.history")}</Button>
                    </Space>
                :
                null
                }
            </div>
        </TopBalanceWrapper>
    );
}

export default TopBalance;
