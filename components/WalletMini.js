import React from "react";
import styles from "@/styles/components/Account/WalletMini.module.scss";
import { formatPrice } from "@/functions/helpers";
import TooltipComponent from "@/components/common/Tooltip";

const WalletMini = ({ walletInfo }) => {
  console.log(walletInfo.amount)

  return  (
    <div
        // style={{border: "3px solid white", boxShadow: "12px 12px 2px 1px rgba(0, 0, 0, .2);"}}
        className={styles.walletWrapper}>
      {/* <h2 className={styles.title}>{walletInfo.title}</h2> */}
      <div
        className={`d-flex align-items-center cursor-pointer ${styles.walletInner}`}
        // onClick={() => router.push("/account/wallet")}
      >
        <div
          className={`${styles.walletIcon} d-flex align-items-center justify-content-center`}
        >
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5722 17.2734C17.1513 17.2734 15.1813 15.3034 15.1813 12.8825C15.1813 10.4617 17.1513 8.49161 19.5722 8.49161H22.0116V6.54009C22.0116 5.46383 21.1363 4.58858 20.0601 4.58858H19.0843V2.63706C19.0843 1.5608 18.2091 0.685547 17.1328 0.685547H3.47219C2.02515 0.685547 0.828867 1.74327 0.594686 3.12397C0.573219 3.20398 0.544922 3.28204 0.544922 3.36888V18.2492C0.544922 19.8631 1.85829 21.1765 3.47219 21.1765H20.0601C21.1363 21.1765 22.0116 20.3012 22.0116 19.2249V17.2734H19.5722ZM2.49644 3.61282C2.49644 3.07518 2.93358 2.63706 3.47219 2.63706H17.1328V4.58858H3.47219C2.93358 4.58858 2.49644 4.15046 2.49644 3.61282Z"
              fill="#1AB0C4"
            />
            <path
              d="M23.2319 9.9541H19.5728C17.9589 9.9541 16.6455 11.2675 16.6455 12.8814C16.6455 14.4953 17.9589 15.8086 19.5728 15.8086H23.2319C23.6358 15.8086 23.9637 15.4808 23.9637 15.0768V10.6859C23.9637 10.282 23.6358 9.9541 23.2319 9.9541Z"
              fill="#1AB0C4"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <span className={styles.descr}>{walletInfo.header}</span>
          <TooltipComponent id={"text"} tooltTipContent={walletInfo.tooltipContent} />
          <strong className={styles.total}>
            {walletInfo.amount}

          </strong>
        </div>

      </div>

    </div>
  )
};

export default WalletMini;

