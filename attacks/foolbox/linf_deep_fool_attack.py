import tensorflow as tf
import foolbox as fb
import numpy as np
import matplotlib.pyplot as plt


def linf_deep_fool_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num):
    model_bounds = (model_lower_bound, model_upper_bound)

    fmodel = fb.TensorFlowModel(model, model_bounds)
    fmodel = fmodel.transform_bounds((0, 1))

    attack = fb.attacks.LinfDeepFoolAttack()
    epsilons = np.linspace(0.0, epsilon_max, num=epsilon_num)

    raw, clipped, is_adv = attack(fmodel, images, labels, epsilons=epsilons)
    robust_accuracy = 1 - tf.math.reduce_mean(tf.cast(is_adv, tf.float32), axis=-1)
    robust_accuracy *= 100

    plt.plot(epsilons, robust_accuracy.numpy())
    plt.ylim(0, 100)

    plt.title("DeepFool L-Infinity Attack")
    plt.xlabel("Epsilons (ε)")
    plt.ylabel("Accuracy (%)")

    plt.show()


if __name__ == "__main__":
    model = tf.keras.applications.ResNet50V2(weights="imagenet")
    model_lower_bound = -1
    model_upper_bound = 1
    images, labels = fb.utils.samples(
        fb.TensorFlowModel(model, bounds=(-1, 1), preprocessing=dict()).transform_bounds((0, 1)), dataset='imagenet',
        batchsize=30)
    epsilon_max = 0.01
    epsilon_num = 21

    linf_deep_fool_attack(model, model_lower_bound, model_upper_bound, images, labels, epsilon_max, epsilon_num)
