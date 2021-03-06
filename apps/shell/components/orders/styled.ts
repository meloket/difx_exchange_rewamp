import styled from "styled-components";
import { Layout } from 'antd';
const { Sider } = Layout;

const SidebarWrapper = styled(Sider)`
  height: calc(100vh - 50px);
  .ant-menu-item{
      gap: 10px;
      &.ant-menu-item-active>div{
          fill: #08c;
      }
      &.ant-menu-item-selected, :hover{
        background-color: ${({theme}) => theme.color.primaryLight} !important;
        &>div, &>div svg, &>div svg path{
            fill: ${({theme}) => theme.color.primary};
        }
        .ant-menu-title-content, .ant-menu-title-content a{
          color: ${({theme}) => theme.color.primary};
          font-weight: ${({theme}) => theme.fontWeight.semiBold};
        }
      }
      .ant-menu-title-content, .ant-menu-title-content a{
          color: ${({theme}) => theme.fontColor.secondary};
      }
      &>div{
        display: flex;
        align-items: center;
      }
  }
  .ant-menu-item-group{
      border-top: ${({theme}) => theme.border.secondary};
  }
`
const OrderTransacrtionWrapper = styled.div`
    margin-top: 2px;
    background: ${({theme}) => theme.background.secondary};
    .head{
        display:flex;
        font-size: 12px;
        margin: 12px 49px;
        .lbl{
            color: ${({ theme }) => theme.fontColor.secondary};
        }
        .val{
        margin-left: 3px;
        }
    }
    .recent_transactions_header{
        padding: 20px;
        h3{
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 0px;
        }
    }
    .anchor-link{
        color: ${({theme}) => theme.fontColor.muted} !important;
    }
    .recent-transactions-table{
        padding: 0px 50px !important;
    }
    .ant-btn{
        border: none !important;;
    }
    .deposit-link{
        color: ${({theme}) => theme.color.success} !important;
    }
`

export {OrderTransacrtionWrapper, SidebarWrapper}