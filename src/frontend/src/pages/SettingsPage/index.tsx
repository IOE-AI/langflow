import SideBarButtonsComponent from "@/components/core/sidebarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  ENABLE_DATASTAX_LANGFLOW,
  ENABLE_PROFILE_ICONS,
} from "@/customization/feature-flags";
import useAuthStore from "@/stores/authStore";
import { useStoreStore } from "@/stores/storeStore";
import { Outlet } from "react-router-dom";
import ForwardedIconComponent from "../../components/common/genericIconComponent";
import PageLayout from "../../components/common/pageLayout";
import { useTranslation } from 'react-i18next';

export default function SettingsPage(): JSX.Element {
  const { t } = useTranslation();
  const autoLogin = useAuthStore((state) => state.autoLogin);
  const hasStore = useStoreStore((state) => state.hasStore);

  // Hides the General settings if there is nothing to show
  const showGeneralSettings = ENABLE_PROFILE_ICONS || hasStore || !autoLogin;

  const sidebarNavItems: {
    href?: string;
    title: string;
    icon: React.ReactNode;
  }[] = [];

  if (showGeneralSettings) {
    sidebarNavItems.push({
      title: t('general'),
      href: "/settings/general",
      icon: (
        <ForwardedIconComponent
          name="SlidersHorizontal"
          className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
        />
      ),
    });
  }

  sidebarNavItems.push(
    {
      title: t('global_variables'),
      href: "/settings/global-variables",
      icon: (
        <ForwardedIconComponent
          name="Globe"
          className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
        />
      ),
    },

    {
      title: t('shortcuts'),
      href: "/settings/shortcuts",
      icon: (
        <ForwardedIconComponent
          name="Keyboard"
          className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
        />
      ),
    },
    {
      title: t('messages'),
      href: "/settings/messages",
      icon: (
        <ForwardedIconComponent
          name="MessagesSquare"
          className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
        />
      ),
    },
  );

  if (!ENABLE_DATASTAX_LANGFLOW) {
    const langflowItems = [
      {
        title: t('langflow_api_keys'),
        href: "/settings/api-keys",
        icon: (
          <ForwardedIconComponent
            name="Key"
            className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
          />
        ),
      },
      {
        title: t('langflow_store'),
        href: "/settings/store",
        icon: (
          <ForwardedIconComponent
            name="Store"
            className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
          />
        ),
      },
    ];

    sidebarNavItems.splice(2, 0, ...langflowItems);
  }

  return (
    <PageLayout
      backTo={"/"}
      title={t('settings')}
      description={t('settings_desc')}
    >
      <SidebarProvider width="15rem" defaultOpen={false}>
        <SideBarButtonsComponent items={sidebarNavItems} />
        <main className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-x-hidden pt-1">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </PageLayout>
  );
}
