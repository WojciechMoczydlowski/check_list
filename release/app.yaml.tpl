apiVersion: apps/v1
kind: Deployment
metadata:
  name: plenti-web
  namespace: default
  labels:
    type: app
    app: plenti
    component: web
spec:
  selector:
    matchLabels:
      type: app
      app: plenti
      component: web
  replicas: 1
  revisionHistoryLimit: 3
  template:
    metadata:
      labels:
        type: app
        app: plenti
        component: web
    spec:
      containers:
      - name: plenti
        image: leancode.azurecr.io/plenti-web:${APP_VERSION}
        resources:
          requests:
            cpu: 100m
            memory: 200Mi
          limits:
            cpu: 200m
            memory: 300Mi
        envFrom:
        - configMapRef:
            name: plenti-config
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: plenti-web
  namespace: default
  labels:
    type: app
    app: plenti
    component: web
spec:
  type: ClusterIP
  ports:
  - port: 80
  selector:
    type: app
    app: plenti
    component: web
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: plenti-web-ingress
  namespace: default
  labels:
    type: app
    app: plenti
    component: web
spec:
  rules:
  - host: ${DOMAIN}
    http:
      paths:
      - backend:
          serviceName: plenti-web
          servicePort: 80
