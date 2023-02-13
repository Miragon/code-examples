package io.miragon.example.base.dummy;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

@Slf4j
@Controller
@RequiredArgsConstructor
public class DummyController {


    @QueryMapping
    public String dummy() {
        return "Dummy String";
    }

    @SubscriptionMapping
    public Publisher<String> mySubscription(){
        return Flux.create(sink -> {
            sink.next("1");
            try {
                Thread.sleep(10000);
                sink.next("2");
                Thread.sleep(1000);
                sink.next("3");
                Thread.sleep(1000);
                sink.next("4");
                Thread.sleep(1000);
                sink.next("5");
                Thread.sleep(1000);
                sink.next("6");
                sink.complete();
            } catch (InterruptedException e) {
                sink.error(new RuntimeException(e));
                return;
            }
        });
    }
}