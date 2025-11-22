import { Router } from 'express';

const router = Router();

type TModuleRoute = {
  path: string;
  route: Router;
};

const moduleRoutes: TModuleRoute[] = [

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
