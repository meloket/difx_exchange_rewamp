import { IconProps } from ".";
import Layout from "./Layout";

function Icon({
  width = 18,
  height = 18,
  useDarkMode,
  fill = "#262626",
}: IconProps) {
  return (
    <Layout fill={fill} useDarkMode={useDarkMode}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.4547 21C8.93857 20.9938 6.49342 20.2343 4.49086 18.8369C3.15128 17.9084 2.05391 16.718 1.27838 15.352C0.50286 13.986 0.068651 12.4788 0.00727681 10.9397C-0.0496404 9.47171 0.227839 8.00893 0.821993 6.64481C1.41615 5.2807 2.31392 4.04523 3.45796 3.01732C4.60201 1.98942 5.96719 1.19166 7.46631 0.674996C8.96543 0.158337 10.5655 -0.0658672 12.1645 0.0167034C12.4507 0.0248845 12.7277 0.111182 12.9602 0.264561C13.1927 0.41794 13.37 0.631431 13.4695 0.877736C13.5865 1.13193 13.6163 1.41279 13.5549 1.68291C13.4936 1.95303 13.344 2.1996 13.126 2.38979C12.2226 3.23126 11.5565 4.26213 11.1855 5.39306C10.8145 6.52399 10.7497 7.72085 10.9968 8.87991C11.4084 10.5644 12.4742 12.0539 13.9952 13.0704C15.5163 14.0869 17.3887 14.561 19.2628 14.404C19.5692 14.3905 19.8739 14.4537 20.1441 14.5869C20.4143 14.7201 20.6399 14.9182 20.7968 15.16C20.9473 15.3929 21.017 15.6623 20.9965 15.9324C20.9761 16.2025 20.8665 16.4605 20.6823 16.6721C19.0133 18.7533 16.5827 20.2134 13.8358 20.7847C13.0479 20.9109 12.2506 20.9811 11.4509 20.9948L11.4547 21ZM10.2861 2.28566C9.01961 2.43947 7.80618 2.84954 6.7336 3.48621C5.3543 4.24037 4.22087 5.32019 3.45154 6.61305C2.68221 7.9059 2.30516 9.36443 2.35973 10.8365C2.41708 12.0572 2.76447 13.2518 3.3776 14.3365C3.99073 15.4213 4.8548 16.3701 5.90939 17.1166C6.94926 17.8599 8.15665 18.3813 9.44378 18.6429C10.7309 18.9044 12.0654 18.8996 13.3502 18.6287C14.9575 18.3532 16.4352 17.6354 17.5867 16.5706C15.4575 16.3698 13.4501 15.5629 11.8459 14.2629C10.2418 12.963 9.1213 11.2352 8.64151 9.32181C8.16927 6.86898 8.76083 4.34399 10.2899 2.28566H10.2861Z" />
      </svg>
    </Layout>
  );
}

export default Icon;