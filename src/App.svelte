<script lang="ts">
  import OnyxApp from 'onyx-ui/components/app/OnyxApp.svelte';
  import { Priority } from 'onyx-ui/enums';
  import { KeyManager, Onyx } from 'onyx-ui/services';
  import { onMount } from 'svelte';
  import Router, { location, pop, replace } from 'svelte-spa-router';
  import AppMenu from './components/AppMenu.svelte';
  import AppSettings from './routes/AppSettings.svelte';
  import ArticleDetail from './routes/ArticleDetail.svelte';
  import ArticleTagger from './routes/ArticleTagger.svelte';
  import Filter from './routes/Filter.svelte';
  import Home from './routes/Home.svelte';
  import LogIn from './routes/LogIn.svelte';
  import LogOut from './routes/LogOut.svelte';
  import Oauth from './routes/Oauth.svelte';
  import Redirect from './routes/Redirect.svelte';
  import Sync from './routes/Sync.svelte';
  import Tags from './routes/Tags.svelte';
  import ViewTag from './routes/ViewTag.svelte';
  import { AuthClient } from './services/authClient';
  import { KaiAds } from './services/kaiAds';
  import { settings } from './stores/settings';

  console.log(`Env: ${process.env.NODE_ENV}`);

  const routes = {
    '/': Home,
    '/login': LogIn,
    '/logout': LogOut,
    '/oauth': Oauth,
    '/sync': Sync,
    '/filter/:filterId': Filter,
    '/tags': Tags,
    '/tags/:tagId': ViewTag,
    '/articles/:articleId': ArticleDetail,
    '/articles/:articleId/tags': ArticleTagger,
    '/settings/:cardId': AppSettings,
    '*': Redirect,
  };

  // TODO: Fix this in a better way
  document.addEventListener('keydown', (ev) => {
    if (
      ev.key === 'Backspace' &&
      $location !== '/' &&
      (ev.target as any).contentEditable !== 'true'
    ) {
      ev.preventDefault();
    }
  });
  const keyMan = KeyManager.subscribe(
    {
      onBackspace: () => {
        // If on the main screen, let KaiOS minimize the app
        if ($location === '/') {
          console.log('exit app');
          return false;
        }

        pop();
        return true;
      },
    },
    Priority.Low
  );

  onMount(async () => {
    KaiAds.startListening();

    if ($location === '/oauth') return;

    if (!AuthClient.user?.username) {
      replace(`/login`);
      return;
    }

    replace('/sync');
  });

  $: Onyx.settings.update($settings);
</script>

<OnyxApp>
  <AppMenu slot="app-menu" />
  <Router {routes} />
</OnyxApp>
