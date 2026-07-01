import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/layout";
import Home from "@/pages/home";
import Collection from "@/pages/collection";
import PerfumeDetail from "@/pages/perfume-detail";
import Checkout from "@/pages/checkout";
import Admin from "@/pages/admin";
import Policy from "@/pages/policy";
import Quiz from "@/pages/quiz";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collection" component={Collection} />
        <Route path="/perfume/:id" component={PerfumeDetail} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/admin" component={Admin} />
        <Route path="/policy" component={Policy} />
        <Route path="/quiz" component={Quiz} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
